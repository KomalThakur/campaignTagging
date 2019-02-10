function deal (floatingParty,fixedParty, createdAt, notionalFloating, notionalfixed, txID, lastFixedAt, block) {
    this.floatingParty = floatingParty;
    this.fixedParty = fixedParty;
    this.createdAt = createdAt;
    this.notionalFloating = notionalFloating;
    this.notionalfixed = notionalfixed;
    this.txID = txID;
    this.lastFixedAt = lastFixedAt;
    this.block = block;
}

module.exports = {
    deal
}