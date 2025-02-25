import { describe, it, beforeEach, expect } from "vitest"

describe("Fundamental Truth Discovery Contract", () => {
  let mockStorage: Map<string, any>
  let nextId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextId = 0
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "propose-truth":
        const [statement, confidence] = args
        const id = nextId++
        mockStorage.set(id, { statement, confidence })
        return { success: true, value: id }
      case "get-truth":
        return { success: true, value: mockStorage.get(args[0]) }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should propose a new truth", () => {
    const result = mockContractCall("propose-truth", ["Reality is an illusion", 80])
    expect(result.success).toBe(true)
    expect(result.value).toBe(0)
  })
  
  it("should retrieve a truth", () => {
    mockContractCall("propose-truth", ["Reality is an illusion", 80])
    const result = mockContractCall("get-truth", [0])
    expect(result.success).toBe(true)
    expect(result.value).toEqual({ statement: "Reality is an illusion", confidence: 80 })
  })
})

