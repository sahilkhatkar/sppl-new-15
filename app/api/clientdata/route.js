// Hi, this is the single file to connect to mongoDB in JS.

import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

export async function GET(req, res) {
  let client, clientPromise;
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  try {
    const client = await clientPromise;
    const db = client.db("client_database");
    const data = await db
      .collection("client_data")
      .find({})
      // .sort({ metacritic: -1 })
        // .limit(50)
      .toArray();

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function POST(req, res) {
  let client, clientPromise;
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  try {
    const client = await clientPromise;
    const data = await req.json();
    console.log(data);

    async function createListing(client, newListing) {
      const result = await client
        .db("client_database")
        .collection("client_data")
        // .insertMany(newListing);
        .insertOne(newListing);
      console.log(
        `New company added with following gstId: ${result.insertedId}`
      );
      return "Document ADDED successfully";
    }
    const result = await createListing(client, data);
    return NextResponse.json("RESULT: " + result + "ID: " + data._id);
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function DELETE(req, res) {
  // FIRST FIND THE DOC THEN DELETE

  let client, clientPromise;
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  // Multiple Delete
  try {
    async function deleteListingByName(client) {
      const result = await client
        .db("client_database")
        .collection("client_data")
        .deleteMany({});
      // console.log(result.deletedCount)
      return `GstID: ... was deleted successfully.`;
    }
    const result = await deleteListingByName(client);
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json("error", e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  // Single Entry Delete
  // try {

  //   const data = await req.json();
  //   console.log(data);

  //   async function deleteListingByName(client, idOfListing) {
  //     const result = await client
  //       .db("client_database")
  //       .collection("client_data")
  //       .deleteOne({ _id: idOfListing });
  //     // console.log(result.deletedCount)
  //     return `GstID: ${idOfListing} was deleted successfully.`;
  //   }

  //   const result = await deleteListingByName(client, data);
  //   return NextResponse.json(result);
  // } catch (e) {
  //   console.error(e);
  //   return NextResponse.json("error", e);
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}

export async function PUT(req, res) {
  // FIRST FIND THE DOC THEN UPDATE

  let client, clientPromise;
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  try {
    const data = await req.json();
    console.log(data);

    async function updateListingByName(client, idOfListing, updatedListing) {
      const result = await client
        .db("client_database")
        .collection("client_data")
        .updateOne({ _id: idOfListing }, { $set: updatedListing });

      // console.log(
      //   `${result.matchedCount} document(s) matched the query criteria.`
      // );
      // console.log(`${result.modifiedCount} document(s) was/were updated.`);
      return `${result.modifiedCount} document was updated.`;
    }

    // const result = await deleteListingByName(client, data);
    const result = await updateListingByName(client, data._id, data);

    return NextResponse.json(`ClientId: ${data._id} was updated successfully`);
    // return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json("error", e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
