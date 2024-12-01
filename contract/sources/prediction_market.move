module prediction_market::market {
    use std::error;
    use std::signer;
    use std::string;
    use aptos_framework::coin::{Self, BurnCapability, FreezeCapability, MintCapability};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;
    use aptos_std::event::{Self, EventHandle};
    use aptos_framework::account;
    /// Market has not started
    const ENO_MARKET: u64 = 0;
    /// Market has already ended
    const EMARKET_ENDED: u64 = 1;
    /// Invalid price provided
    const EINVALID_PRICE: u64 = 2;
    /// Insufficient balance
    const EINSUFFICIENT_BALANCE: u64 = 3;
    /// Market not resolved
    const EMARKET_NOT_RESOLVED: u64 = 4;
    /// Unauthorized operation
    const EUNAUTHORIZED: u64 = 5;
    /// Invalid amount
    const EINVALID_AMOUNT: u64 = 6;
    struct YesToken {}
    struct NoToken {}
    struct TokenCapabilities has key {
        yes_mint_cap: MintCapability<YesToken>,
        yes_burn_cap: BurnCapability<YesToken>,
        yes_freeze_cap: FreezeCapability<YesToken>,
        no_mint_cap: MintCapability<NoToken>,
        no_burn_cap: BurnCapability<NoToken>,
        no_freeze_cap: FreezeCapability<NoToken>,
    }
    struct Market has key {
        id: u64,
        question: vector<u8>,
        end_time: u64,
        oracle: address,
        resolved: bool,
        outcome: u8,
        yes_price: u64,  // Price in APT (scaled by 1e6)
        no_price: u64,   // Price in APT (scaled by 1e6)
        yes_supply: u64,
        no_supply: u64,
        liquidity_pool: u64,  // Holds APT for payouts
        trade_events: EventHandle<TradeEvent>,
        resolve_events: EventHandle<ResolveEvent>,
        price_update_events: EventHandle<PriceUpdateEvent>,
    }
    struct TradeEvent has drop, store {
        market_id: u64,
        trader: address,
        is_yes: bool,
        is_buy: bool,
        amount: u64,
        price: u64,
        total_cost: u64,
    }
    struct ResolveEvent has drop, store {
        market_id: u64,
        outcome: u8,
        timestamp: u64,
    }
    struct PriceUpdateEvent has drop, store {
        market_id: u64,
        yes_price: u64,
        no_price: u64,
        timestamp: u64,
    }
    public fun initialize_market(
        account: &signer,
        question: vector<u8>,
        end_time: u64,
        oracle: address,
        initial_yes_price: u64,
        initial_no_price: u64,
        initial_liquidity: u64,
    ) {
        let market_addr = signer::address_of(account);
        assert!(initial_yes_price > 0 && initial_yes_price <= 1000000, error::invalid_argument(EINVALID_PRICE));
        assert!(initial_no_price > 0 && initial_no_price <= 1000000, error::invalid_argument(EINVALID_PRICE));
        // Transfer initial liquidity to the market
        let coins = coin::withdraw<AptosCoin>(account, initial_liquidity);
        coin::deposit(market_addr, coins);
        let (yes_burn_cap, yes_freeze_cap, yes_mint_cap) = coin::initialize<YesToken>(
            account,
            string::utf8(b"YES"),
            string::utf8(b"YES"),
            6,
            true,
        );
        let (no_burn_cap, no_freeze_cap, no_mint_cap) = coin::initialize<NoToken>(
            account,
            string::utf8(b"NO"),
            string::utf8(b"NO"),
            6,
            true,
        );
        move_to(account, TokenCapabilities {
            yes_mint_cap,
            yes_burn_cap,
            yes_freeze_cap,
            no_mint_cap,
            no_burn_cap,
            no_freeze_cap,
        });
        let market = Market {
            id: timestamp::now_microseconds(),
            question,
            end_time,
            oracle,
            resolved: false,
            outcome: 0,
            yes_price: initial_yes_price,
            no_price: initial_no_price,
            yes_supply: 0,
            no_supply: 0,
            liquidity_pool: initial_liquidity,
            trade_events: account::new_event_handle<TradeEvent>(account),
            resolve_events: account::new_event_handle<ResolveEvent>(account),
            price_update_events: account::new_event_handle<PriceUpdateEvent>(account),
        };
        move_to(account, market);
    }
    public fun buy_prediction(
        account: &signer,
        market_addr: address,
        is_yes: bool,
        amount: u64,
    ) acquires Market, TokenCapabilities {
        let market = borrow_global_mut<Market>(market_addr);
        let caps = borrow_global<TokenCapabilities>(market_addr);
        assert!(!market.resolved, error::invalid_state(EMARKET_ENDED));
        assert!(timestamp::now_seconds() < market.end_time, error::invalid_state(EMARKET_ENDED));
        assert!(amount > 0, error::invalid_argument(EINVALID_AMOUNT));
        let trader_addr = signer::address_of(account);
        let price = if (is_yes) { market.yes_price } else { market.no_price };
        let total_cost = (price * amount) / 1000000; // Convert from 6 decimal places
        let trader_balance = coin::balance<AptosCoin>(trader_addr);
        assert!(trader_balance >= total_cost, error::invalid_argument(EINSUFFICIENT_BALANCE));
        // Transfer APT from buyer to market
        let payment = coin::withdraw<AptosCoin>(account, total_cost);
        coin::deposit(market_addr, payment);
        market.liquidity_pool = market.liquidity_pool + total_cost;
        // Mint and transfer outcome tokens
        if (is_yes) {
            let yes_tokens = coin::mint(amount, &caps.yes_mint_cap);
            coin::deposit(trader_addr, yes_tokens);
            market.yes_supply = market.yes_supply + amount;
        } else {
            let no_tokens = coin::mint(amount, &caps.no_mint_cap);
            coin::deposit(trader_addr, no_tokens);
            market.no_supply = market.no_supply + amount;
        };
        event::emit_event(
            &mut market.trade_events,
            TradeEvent {
                market_id: market.id,
                trader: trader_addr,
                is_yes,
                is_buy: true,
                amount,
                price,
                total_cost,
            },
        );
    }
    public fun sell_prediction(
        account: &signer,
        market_addr: address,
        is_yes: bool,
        amount: u64,
    ) acquires Market, TokenCapabilities {
        let market = borrow_global_mut<Market>(market_addr);
        let caps = borrow_global<TokenCapabilities>(market_addr);
        let trader_addr = signer::address_of(account);
        assert!(!market.resolved, error::invalid_state(EMARKET_ENDED));
        assert!(amount > 0, error::invalid_argument(EINVALID_AMOUNT));
        let price = if (is_yes) { market.yes_price } else { market.no_price };
        let total_payout = (price * amount) / 1000000; // Convert from 6 decimal places
        assert!(total_payout <= market.liquidity_pool, error::invalid_state(EINSUFFICIENT_BALANCE));
        // Burn the outcome tokens
        if (is_yes) {
            let tokens = coin::withdraw<YesToken>(account, amount);
            coin::burn(tokens, &caps.yes_burn_cap);
            market.yes_supply = market.yes_supply - amount;
        } else {
            let tokens = coin::withdraw<NoToken>(account, amount);
            coin::burn(tokens, &caps.no_burn_cap);
            market.no_supply = market.no_supply - amount;
        };
        // Transfer APT from market to seller
        let payment = coin::withdraw<AptosCoin>(account, total_payout);
        coin::deposit(trader_addr, payment);
        market.liquidity_pool = market.liquidity_pool - total_payout;
        event::emit_event(
            &mut market.trade_events,
            TradeEvent {
                market_id: market.id,
                trader: trader_addr,
                is_yes,
                is_buy: false,
                amount,
                price,
                total_cost: total_payout,
            },
        );
    }
    public fun resolve(
        account: &signer,
        market_addr: address,
        outcome: u8,
    ) acquires Market {
        let market = borrow_global_mut<Market>(market_addr);
        assert!(signer::address_of(account) == market.oracle, error::permission_denied(EUNAUTHORIZED));
        assert!(!market.resolved, error::invalid_state(EMARKET_ENDED));
        assert!(outcome == 0 || outcome == 1, error::invalid_argument(EINVALID_PRICE));
        market.resolved = true;
        market.outcome = outcome;
        event::emit_event(
            &mut market.resolve_events,
            ResolveEvent {
                market_id: market.id,
                outcome,
                timestamp: timestamp::now_microseconds(),
            },
        );
    }
    public fun claim_winnings(
        account: &signer,
        market_addr: address,
    ) acquires Market, TokenCapabilities {
        let market = borrow_global_mut<Market>(market_addr);
        let caps = borrow_global<TokenCapabilities>(market_addr);
        let trader_addr = signer::address_of(account);
        assert!(market.resolved, error::invalid_state(EMARKET_NOT_RESOLVED));
        if (market.outcome == 1) {
            // YES tokens win
            let balance = coin::balance<YesToken>(trader_addr);
            if (balance > 0) {
                let tokens = coin::withdraw<YesToken>(account, balance);
                coin::burn(tokens, &caps.yes_burn_cap);
                // Transfer APT winnings
                let winnings = balance; // 1:1 payout for winning tokens
                let payment = coin::withdraw<AptosCoin>(account, winnings);
                coin::deposit(trader_addr, payment);
                market.liquidity_pool = market.liquidity_pool - winnings;
            }
        } else {
            // NO tokens win
            let balance = coin::balance<NoToken>(trader_addr);
            if (balance > 0) {
                let tokens = coin::withdraw<NoToken>(account, balance);
                coin::burn(tokens, &caps.no_burn_cap);
                // Transfer APT winnings
                let winnings = balance; // 1:1 payout for winning tokens
                let payment = coin::withdraw<AptosCoin>(account, winnings);
                coin::deposit(trader_addr, payment);
                market.liquidity_pool = market.liquidity_pool - winnings;
            }
        };
    }
    #[view]
    public fun get_market_info(market_addr: address): (u64, vector<u8>, u64, address, bool, u8, u64, u64, u64, u64) acquires Market {
        let market = borrow_global<Market>(market_addr);
        (
            market.id,
            *&market.question,
            market.end_time,
            market.oracle,
            market.resolved,
            market.outcome,
            market.yes_price,
            market.no_price,
            market.yes_supply,
            market.no_supply,
        )
    }
}
#[test_only]
module prediction_market::market_tests {
    use aptos_framework::account;
    use aptos_framework::coin::{Self};
    use aptos_framework::aptos_coin::{Self, AptosCoin};
    use aptos_framework::timestamp;
    use prediction_market::market::{Self, YesToken, NoToken};
    // Test addresses
    const ADMIN: address = @0x100;
    const USER1: address = @0x123;
    const USER2: address = @0x456;
    const ORACLE: address = @0x789;
    // Error constants from the main module
    const ENO_MARKET: u64 = 0;
    const EMARKET_ENDED: u64 = 1;
    const EINVALID_PRICE: u64 = 2;
    const EINSUFFICIENT_BALANCE: u64 = 3;
    const EMARKET_NOT_RESOLVED: u64 = 4;
    const EUNAUTHORIZED: u64 = 5;
    const EINVALID_AMOUNT: u64 = 6;
    fun setup_test(aptos_framework: &signer) {
        timestamp::set_time_has_started_for_testing(aptos_framework);
        // Create test accounts
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        let user2 = account::create_account_for_test(USER2);
        let oracle = account::create_account_for_test(ORACLE);
        // Initialize AptosCoin
        let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(aptos_framework);
        // Fund accounts with APT
        coin::register<AptosCoin>(&admin);
        coin::register<AptosCoin>(&user1);
        coin::register<AptosCoin>(&user2);
        coin::register<AptosCoin>(&oracle);
        let coins = coin::mint<AptosCoin>(10000000000, &mint_cap); // 10000 APT
        coin::deposit(ADMIN, coins);
        let coins = coin::mint<AptosCoin>(10000000000, &mint_cap);
        coin::deposit(USER1, coins);
        let coins = coin::mint<AptosCoin>(10000000000, &mint_cap);
        coin::deposit(USER2, coins);
        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }
    #[test]
    public fun test_initialize_market() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600, // Dec 31, 2024
            ORACLE,
            500000, // $0.50 yes price
            500000, // $0.50 no price
            1000000000, // 1000 APT initial liquidity
        );
        // Verify market state
        let (_, question, end_time, oracle, resolved, outcome, yes_price, no_price, yes_supply, no_supply) =
            market::get_market_info(ADMIN);
        assert!(question == b"Will ETH reach $5000 by end of 2024?", 0);
        assert!(end_time == 1735689600, 1);
        assert!(oracle == ORACLE, 2);
        assert!(!resolved, 3);
        assert!(outcome == 0, 4);
        assert!(yes_price == 500000, 5);
        assert!(no_price == 500000, 6);
        assert!(yes_supply == 0, 7);
        assert!(no_supply == 0, 8);
    }
    #[test]
    #[expected_failure(abort_code = 65538)]
    public fun test_initialize_market_invalid_price() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        // Should fail with price > 1000000 (1 APT)
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            1500000, // Invalid price > 1 APT
            500000,
            1000000000,
        );
    }
    #[test]
    public fun test_buy_prediction() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            500000, // $0.50 yes price
            500000, // $0.50 no price
            1000000000, // 1000 APT initial liquidity
        );
        // Register for YES and NO tokens
        coin::register<YesToken>(&user1);
        coin::register<NoToken>(&user1);
        // Check initial APT balance
        let initial_apt_balance = coin::balance<AptosCoin>(USER1);
        // Buy YES prediction
        market::buy_prediction(
            &user1,
            ADMIN,
            true, // buy YES
            1000000, // 1 YES token
        );
        // Verify balances
        let yes_balance = coin::balance<YesToken>(USER1);
        assert!(yes_balance == 1000000, 0); // Should have 1 YES token
        let (_, _, _, _, _, _, _, _, yes_supply, _) = market::get_market_info(ADMIN);
        assert!(yes_supply == 1000000, 1); // Total supply should be 1
        // Check APT balance after purchase
        let apt_balance_after = coin::balance<AptosCoin>(USER1);
        let total_cost = 500000; // YES price is 0.50 APT, buying 1 token
        assert!(apt_balance_after == initial_apt_balance - total_cost, 2); // APT balance should decrease by the cost
    }
    #[test]
    public fun test_sell_prediction() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            500000, // $0.50 yes price
            500000, // $0.50 no price
            1000000000, // 1000 APT initial liquidity
        );
        // Register for tokens
        coin::register<YesToken>(&user1);
        coin::register<NoToken>(&user1);
        // Buy YES prediction
        market::buy_prediction(&user1, ADMIN, true, 1000000);
        // Sell YES prediction
        market::sell_prediction(&user1, ADMIN, true, 1000000);
        // Verify YES token balance
        let yes_balance = coin::balance<YesToken>(USER1);
        assert!(yes_balance == 0, 0); // Should have no YES tokens
        // Verify total YES token supply
        let (_, _, _, _, _, _, _, _, yes_supply, _) = market::get_market_info(ADMIN);
        assert!(yes_supply == 0, 1); // Total supply should be 0
    }
    #[test]
    public fun test_resolve_and_claim() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        let oracle = account::create_account_for_test(ORACLE);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            500000,
            500000,
            1000000000,
        );
        // Register for tokens
        coin::register<YesToken>(&user1);
        coin::register<NoToken>(&user1);
        // Buy YES prediction
        market::buy_prediction(&user1, ADMIN, true, 1000000);
        // Resolve market as YES
        market::resolve(&oracle, ADMIN, 1);
        // Claim winnings
        market::claim_winnings(&user1, ADMIN);
        // Verify balances
        let yes_balance = coin::balance<YesToken>(USER1);
        assert!(yes_balance == 0, 0); // YES tokens should be burned
        let apt_balance = coin::balance<AptosCoin>(USER1);
        assert!(apt_balance > 9500000000, 1); // Should have received winnings
    }
    #[test]
    #[expected_failure(abort_code = 196612)]
    public fun test_claim_before_resolve() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            500000,
            500000,
            1000000000,
        );
        // Register for tokens
        coin::register<YesToken>(&user1);
        coin::register<NoToken>(&user1);
        // Buy YES prediction
        market::buy_prediction(&user1, ADMIN, true, 1000000);
        // Try to claim before resolve (should fail)
        market::claim_winnings(&user1, ADMIN);
    }
    #[test]
    #[expected_failure(abort_code = 196609)]
    public fun test_trade_after_resolve() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        let oracle = account::create_account_for_test(ORACLE);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            500000,
            500000,
            1000000000,
        );
        // Register for tokens
        coin::register<YesToken>(&user1);
        coin::register<NoToken>(&user1);
        // Resolve market
        market::resolve(&oracle, ADMIN, 1);
        // Try to buy after resolve (should fail)
        market::buy_prediction(&user1, ADMIN, true, 1000000);
    }
    #[test]
    #[expected_failure(abort_code = 327685)]
    public fun test_unauthorized_resolve() {
        let aptos_framework = account::create_account_for_test(@aptos_framework);
        setup_test(&aptos_framework);
        let admin = account::create_account_for_test(ADMIN);
        let user1 = account::create_account_for_test(USER1);
        // Initialize market
        market::initialize_market(
            &admin,
            b"Will ETH reach $5000 by end of 2024?",
            1735689600,
            ORACLE,
            500000,
            500000,
            1000000000,
        );
        // Try to resolve as non-oracle (should fail)
        market::resolve(&user1, ADMIN, 1);
    }
}