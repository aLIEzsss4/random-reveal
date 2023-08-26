import { ethers } from "hardhat";
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const valA = ethers.keccak256("0xBAD060A7");
const hashA = ethers.keccak256(valA);
const valBwin = ethers.keccak256("0x600D60A7");
const valBlose = ethers.keccak256("0xBAD060A7");

// Chai's expect(<operation>).to.be.revertedWith behaves
// strangely, so I'm implementing that functionality myself
// with try/catch
const interpretErr = (err) => {
  if (err.reason) return err.reason;
  else return err.stackTrace[0].message.value.toString("ascii");
};

describe("Game", async () => {
  it("Not allow you to propose a zero wei bet", async () => {
    const f = await ethers.getContractFactory("Game");
    const c = await f.deploy();

    try {
      const tx = await c.proposeBet(hashA);
      var rcpt = await tx.wait();

      // If we get here, it's a fail
      expect("this").to.equal("fail");
    } catch (err) {
      expect(interpretErr(err)).to.match(/you need to actually bet something/);
    }
  }); // it "Not allow you to bet zero wei"

  it("Not allow you to accept a bet that doesn't exist", async () => {
    const f = await ethers.getContractFactory("Game");
    const c = await f.deploy();

    try {
      const tx = await c.acceptBet(hashA, valBwin, { value: 10 });
      var rcpt = await tx.wait();
      expect("this").to.equal("fail");
    } catch (err) {
      expect(interpretErr(err)).to.match(/Nobody made that bet/);
    }
  }); // it "Not allow you to accept a bet that doesn't exist"

  
}); // describe("Game")
