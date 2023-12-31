import { Router } from "express";
import bucketsService from "../services/bucketsService.mjs";
import objectsService from "../services/objectsService.mjs";

const router = Router();

/*

    @ Pushpendra
    API Path - "/"
    Method Type - GET
    Desc - for path "/" we will send home page
    Params - {}
    Date - 28/10/23

*/

router.get("/", (req, res) => {
  return res.send("AWS S3 CLONE SERVER IS WORKING FINE !!");
});

/*

    @ Pushpendra
    API Path - "/get-buckets"
    Method Type - GET
    Desc - Created api for getting buckets list
    Params - {}
    Date - 28/10/23

*/

router.get("/get-buckets", async (req, res) => {
  try {
    const response = await bucketsService.getBuckets();
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/get-buckets} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/create-bucket"
    Method Type - POST
    Desc - Created api for creating buckets
    Params - {
      bucket_name: string,
      bucket_description?: string
    }
    Date - 28/10/23

*/

router.post("/create-bucket", async (req, res) => {
  try {
    const body = req.body, response = await bucketsService.createBucket(body);
    return res.status(response.status_code).send(response);
  } catch (err) {
    let errorMessage = err.code === 'ER_DUP_ENTRY' ? 'This bucket name is already exists' : 'Error in process';
    console.log("Error in {/create-bucket} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: errorMessage, status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/get-objects"
    Method Type - GET
    Desc - Created api for getting objects based on bucket_id
    Params - {
        bucket_id: number,
        relation_id: number
    }
    Date - 28/10/23

*/

router.get("/get-objects", async (req, res) => {
  try {
    const { query } = req,
      response = await objectsService.getObjects(query);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/get-objects} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/get-objects-by-id"
    Method Type - GET
    Desc - Created api for getting objects based on bucket_id
    Params - {
        bucket_id: number,
        object_id: number,
        relation_id: number
    }
    Date - 28/10/23

*/

router.get("/get-objects-by-id", async (req, res) => {
  try {
    const { query } = req,
      response = await objectsService.getObjectById(query);
    return res.status(response.status_code).json(response);
  } catch (err) {
    console.log("Error in {/get-objects-by-id} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/insert-object"
    Method Type - POST
    Desc - Created api inserting objects in bucket based on bucket_id
    Params - {
        bucket_id: number,
        object: file,
        relation_id: number,
    }
    Date - 28/10/23

*/

router.post("/insert-object", async (req, res) => {
  try {
    let response = await objectsService.insertObject(req, res);
    return res.status(response.status_code).send(response);
  } catch (err) {
    let errorMessage = err.code === 'ER_DUP_ENTRY' ? 'This object name is already exists' : 'Error in process';
    console.log("Error in {/insert-object} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: errorMessage, status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/insert-object"
    Method Type - POST
    Desc - Created api inserting objects in bucket based on bucket_id
    Params - {
        bucket_id: number,
        relation_id: number,
        folder_name: string
    }
    Date - 29/10/23

*/

router.post("/insert-folder", async (req, res) => {
  try {
    let response = await objectsService.insertFolder(req.body);
    return res.status(response.status_code).send(response);
  } catch (err) {
    let errorMessage = err.code === 'ER_DUP_ENTRY' ? 'This object name is already exists' : 'Error in process';
    console.log("Error in {/insert-object} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: errorMessage, status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/delete-objects"
    Method Type - POST
    Desc - Created api for deleting objects from bucket
    Params - {
        bucket_id: number,
        object_ids: number[],
        relation_id: number,
        isFolder: boolean
    }
    Date - 28/10/23

*/

router.post("/delete-objects", async (req, res) => {
  try {
    let body = req.body, response = await objectsService.deleteObjects(body);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/delete-objects} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in deleting objects", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/delete-bucket"
    Method Type - POST
    Desc - Created api for deleting buckets
    Params - {
        bucket_id: number,
    }
    Date - 28/10/23

*/

router.post("/delete-bucket", async (req, res) => {
  try {
    let body = req.body, response = await bucketsService.deleteBucket(body);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/delete-bucket} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in deleting objects", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/empty-bucket"
    Method Type - POST
    Desc - Created api for deleting buckets
    Params - {
        bucket_id: number,
    }
    Date - 28/10/23

*/

router.post("/empty-buckets", async (req, res) => {
  try {
    let body = req.body, response = await bucketsService.emptyBucket(body);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/empty-buckets} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in deleting objects", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/get-relation-id"
    Method Type - GET
    Desc - Created api for getting relation id from object id
    Params - {
        bucket_id: number,
        object_id: number,
    }
    Date - 29/10/23

*/

router.get("/get-relation-id", async (req, res) => {
  try {
    const { query } = req,
      response = await objectsService.getRelationById(query);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/get-relation-id} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});


export default router;