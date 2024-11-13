import { UpdateQuoteCall } from "../generated/MinimalOracleBTC/MinimalOracle"
import { Quote } from "../generated/schema"

export function handleUpdateQuote(call: UpdateQuoteCall): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Quote.load(call.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Quote(call.transaction.hash.toHex())
  }

  // Entity fields can be set based on call parameters
  entity.current = call.inputs.quote
  entity.updatedAt = call.block.timestamp
  
  // Entities can be written to the store with `.save()`
  entity.save()

}