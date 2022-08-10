/* eslint-disable camelcase */
const app = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env.test"),
});

const {MONGO_URI, API_KEY} = process.env;
beforeEach(async () => {
  await mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Product endpoints", () => {
  it("test user is not authorized", async () => {
    const result = await request(app).get("/api/product");
    expect(result.statusCode).toBe(401);
  });

  it("test user is authorized", async () => {
    const result = await request(app)
      .get("/api/product")
      .set("apikey", API_KEY);

    expect(result.statusCode).toBe(200);
  });

  it("test get product list", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    let result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);

    result = await request(app)
      .get("/api/product")
      .set("apikey", API_KEY);

    expect(result.statusCode).toBe(200);

    expect(result.body.products[0].name).toBe(product.name);
  });

  it("test add new product", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    const result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);
    expect(result.body.product.name).toBe(product.name);
  });

  it("test delete product", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    let result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);
    const product_id = result.body.product._id;

    result = await request(app)
      .delete(`/api/product/${product_id}`)
      .set("apikey", API_KEY);

    expect(result.statusCode).toBe(202);
    expect(result.body.success).toBe(
      "product deleted successfully"
    );
  });

  it("test update product", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };

    const updatedProduct = {
      reference: "4505216782",
      name: "test", // update field
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    let result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);
    const product_id = result.body.product._id;

    result = await request(app)
      .patch(`/api/product/${product_id}`)
      .set("apikey", API_KEY)
      .send(updatedProduct);

    expect(result.statusCode).toBe(200);

    expect(result.body.success).toBe(
      "product updated successfully"
    );
  });

  it("test get variants list of product by product_id", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    let result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);
    const product_id = result.body.product._id;

    result = await request(app)
      .get(`/api/product/${product_id}/variants`)
      .set("apikey", API_KEY);

    expect(result.statusCode).toBe(200);
    expect(result.body.product.variants[0].sku).toBe(
      product.variants[0].sku
    );
  });

  it("test get variant of a product by product_id and variant_id ", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    let result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);
    const product_id = result.body.product._id;
    const variant_id = result.body.product.variants[0]._id;

    result = await request(app)
      .get(
        `/api/product/${product_id}/variants/${variant_id}`
      )
      .set("apikey", API_KEY);

    expect(result.statusCode).toBe(200);
    expect(result.body.product[0].variants[0].sku).toBe(
      product.variants[0].sku
    );
  });

  it("test get product by product_id", async () => {
    const product = {
      reference: "4505216782",
      name: "LuxSky",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      image: "https://via.placeholder.com/150",
      variants: [
        {
          sku: "Shi/Ae-GrL89",
          specification: "Green",
          price: 250,
        },
      ],
    };
    let result = await request(app)
      .post("/api/product")
      .set("apikey", API_KEY)
      .send(product);

    expect(result.statusCode).toBe(201);
    const product_id = result.body.product._id;

    result = await request(app)
      .get(`/api/product/${product_id}`)
      .set("apikey", API_KEY);

    expect(result.statusCode).toBe(200);
    expect(result.body.product.name).toBe(product.name);
  });
});
