import * as coin from "./coin"
// @ponicode
describe("coin.upbitConnect", () => {
    test("0", () => {
        let callFunction: any = () => {
            coin.upbitConnect()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("coin.fetchGetCoinNames", () => {
    test("0", () => {
        let callFunction: any = () => {
            coin.fetchGetCoinNames()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("coin.setFavoriteCoin", () => {
    test("0", () => {
        let callFunction: any = () => {
            coin.setFavoriteCoin("Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            coin.setFavoriteCoin("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            coin.setFavoriteCoin("George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            coin.setFavoriteCoin("Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            coin.setFavoriteCoin("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            coin.setFavoriteCoin("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("coin.initFavoriteCoin", () => {
    test("0", () => {
        let callFunction: any = () => {
            coin.initFavoriteCoin()
        }
    
        expect(callFunction).not.toThrow()
    })
})
