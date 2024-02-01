#! /usr/bin/env node

console.log(
  'This script populates some test documents to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Disc = require("./models/disc");
const DiscType = require("./models/discType");
const Manufacturer = require("./models/manufacturer");

const discs = [];
const discTypes = [];
const manufacturers = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createDiscTypes();
  await createManufacturers();
  await createDiscs();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function manufacturerCreate(index, name, plastics) {
  const manufacturer = new Manufacturer({
    name: name,
    plastics: plastics,
  });
  await manufacturer.save();
  manufacturers[index] = manufacturer;
  console.log(`Added manufacturer: ${name}`);
}

async function discTypeCreate(index, type, description) {
  const discType = new DiscType({ type: type, description: description });
  await discType.save();
  discTypes[index] = discType;
  console.log(`Added disc type: ${type}`);
}

async function discCreate(
  index,
  name,
  manufacturer,
  plastic,
  flightNumbers,
  discType,
  price,
  stock
) {
  const discDetail = {
    name: name,
    manufacturer: manufacturer,
    plastic: plastic,
    flightNumbers: flightNumbers,
    discType: discType,
    price: price,
    stock: stock,
  };

  const disc = new Disc(discDetail);
  await disc.save();
  discs[index] = disc;
  console.log(`Added disc: ${name}`);
}

async function createManufacturers() {
  console.log("Adding manufacturers");
  await Promise.all([
    manufacturerCreate(0, "MVP/Axiom/Streamline", [
      "Electron",
      "Neutron",
      "Proton",
      "Fission",
      "Eclipse",
      "Plasma",
      "Cosmic Neutron",
      "Cosmic Electron",
      "Prism Proton",
      "R2 Neutron",
    ]),
    manufacturerCreate(1, "Innova", [
      "Star",
      "Champion",
      "DX",
      "Halo Star",
      "GStar",
      "Blizzard",
      "Metal Flake",
      "Nexus",
      "XT",
      "Pro",
      "R-Pro",
      "KC Pro",
      "JK Pro",
    ]),
    manufacturerCreate(2, "Kastaplast", [
      "K1",
      "K1 Soft",
      "K3",
      "K3 Hard",
      "K1 Glow",
    ]),
  ]);
}

async function createDiscTypes() {
  console.log("Adding disc types");
  await Promise.all([
    discTypeCreate(
      0,
      "Putters",
      "Putters are the deepest, slowest, disc golf discs and have the thinnest rims. Putters are intended to fly shorter distances and on straighter lines. Putters are the slowest spinning discs, so they have less potential to deviate off line. While putters are made to go in the basket, they’re also less likely to fly too far beyond the basket. Along with developing a good short game, a player’s use of putters is extremely important to scoring well."
    ),
    discTypeCreate(
      1,
      "Midranges",
      "Midranges are a great disc to choose as your first disc. Midranges often offer straighter flights and won’t vary from their intended flight to the degree that fairway and distance drivers will if thrown errantly. Midranges have smaller rims that feel comfortable in most people’s hands and often have slightly deeper inner rims than drivers do. Midranges are very helpful for navigating narrow fairways and landing approaches close to the basket."
    ),
    discTypeCreate(
      2,
      "Fairway Drivers",
      "Fairway Drivers have slightly smaller rims than distance drivers and are easier to control because they have less speed potential. While fairway drivers have less distance potential, they are a great choice for tighter lines, shots with less skip at the end, straighter flights, and shorter drives. Fairway drivers are generally a good choice for experienced and inexperienced players alike."
    ),
    discTypeCreate(
      3,
      "Distance Drivers",
      "Distance Drivers, as their name suggests, have the greatest potential to travel the greatest distance. However, they also require the greatest speed to travel true to their intended flight characteristics. Distance drivers have wider rims and sharper noses, so they might not be the best choice for younger players, newer players, or players with slower arm speeds."
    ),
  ]);
}

async function createDiscs() {
  console.log("Adding Discs");
  await Promise.all([
    discCreate(
      0,
      "Pilot",
      manufacturers[0],
      "Electron",
      { speed: 2, glide: 5, turn: 0, fade: 1 },
      discTypes[0],
      16.49,
      50
    ),
    discCreate(
      1,
      "Hex",
      manufacturers[0],
      "Neutron",
      { speed: 5, glide: 5, turn: -1, fade: 1 },
      discTypes[1],
      24.49,
      25
    ),
    discCreate(
      2,
      "Time Lapse",
      manufacturers[0],
      "Neutron",
      { speed: 12, glide: 5, turn: -1, fade: 3 },
      discTypes[3],
      24.49,
      12
    ),
    discCreate(
      3,
      "Firebird",
      manufacturers[1],
      "Champion",
      { speed: 9, glide: 3, turn: 0, fade: 4 },
      discTypes[2],
      23.49,
      33
    ),
    discCreate(
      4,
      "Destroyer",
      manufacturers[1],
      "Star",
      { speed: 12, glide: 5, turn: -1, fade: 3 },
      discTypes[3],
      23.49,
      62
    ),
    discCreate(
      5,
      "Aviar",
      manufacturers[1],
      "DX",
      { speed: 2, glide: 3, turn: 0, fade: 1 },
      discTypes[0],
      13.99,
      420
    ),
    discCreate(
      6,
      "Berg",
      manufacturers[2],
      "K1",
      { speed: 1, glide: 1, turn: 0, fade: 2 },
      discTypes[0],
      25.49,
      35
    ),
    discCreate(
      7,
      "Berg",
      manufacturers[2],
      "K1 Soft",
      { speed: 1, glide: 1, turn: 0, fade: 2 },
      discTypes[0],
      25.49,
      13
    ),
    discCreate(
      8,
      "Berg",
      manufacturers[2],
      "K3",
      { speed: 1, glide: 1, turn: 0, fade: 2 },
      discTypes[0],
      18.49,
      49
    ),
  ]);
}
