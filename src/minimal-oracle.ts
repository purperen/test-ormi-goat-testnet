import { UpdateQuoteCall, Cloned, RoleGranted } from "../generated/MinimalOracleBTC/MinimalOracle"
import { Quote, Clone, GrantRole } from "../generated/schema"
import { ByteArray } from "@graphprotocol/graph-ts";

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

export function handleRoleGranted(event: RoleGranted): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = GrantRole.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new GrantRole(event.transaction.hash.toHex())
  }

  // Entity fields can be set based on call parameters
  entity.role = event.params.role
  entity.grantee = event.params.account
  entity.granter = event.params.sender
  entity.grantedAt = event.block.timestamp
  
  // Entities can be written to the store with `.save()`
  entity.save()

}

export function handleCloned(event: Cloned): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Clone.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Clone(event.transaction.hash.toHex())
  }

  // Entity fields can be set based on call parameters
  entity.newInstance = event.params.newInstance
  entity.clonedAt = event.block.timestamp
  
  // Entities can be written to the store with `.save()`
  entity.save()

}
