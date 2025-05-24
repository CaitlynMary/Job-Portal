/*import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database

/*export const clerkWebhooks = async (req, res) => {
    try{
            // Create a Svix instance with clerk 

            const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

            //verify headers
            await whook.verify(JSON.stringify(req.body), {
                "svix-id" : req.headers["svix-id"],
                "svix-timestamp" : req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            })

          // Getting data from request body

          const { data, type} = req.body

          // Switch Cases for different Events

          switch (type) {
            case 'user.created':{

                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    name : data.first_name + " "+ data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
              res.status(200).json({ success: true, message: "Webhook handled" });

                break;

            }
            case 'user.updated':{
                const userData = { 
                    email: data.email_addresses[0].email_addresses,
                    name : data.first_name + " "+ data.last_name,
                    image: data.image_url,
                  
                }

                await User.findByIdAndUpdate(data.id, userData)
               res.status(200).json({ success: true, message: "Webhook handled" });

                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
               res.status(200).json({ success: true, message: "Webhook handled" });

                break;
                
                
            }
            default:
                break;
          }


    }
    catch (error) {
        console.log(error.message)
        res.json({success:false,message:'Webhooks Error'})

    }

}*/


/*import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id, // make sure your Mongoose model supports custom _id
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: ''
        };
        await User.create(userData);
        return res.status(200).json({ success: true, message: "User created" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url
        };
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        return res.status(200).json({ success: true, message: "User updated" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true, message: "User deleted" });
      }

      default:
        return res.status(400).json({ success: false, message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).json({ success: false, message: "Webhook error", error: error.message });
  }
};*/

/*export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    const evt = whook.verify(payload, headers);
    const { data, type } = evt;

    // ✅ Log the entire event and data for debugging
    console.log("🔔 Clerk Webhook Event Type:", type);
    console.log("📦 Clerk Webhook Data:", JSON.stringify(data, null, 2));

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: ""
        };

        console.log("✅ Creating User:", userData);
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url
        };

        console.log("🔄 Updating User:", userData);
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        break;
      }

      case "user.deleted": {
        console.log("🗑️ Deleting User ID:", data.id);
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook handled" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).json({ success: false, message: "Webhook Error" });
  }
};*/

/*import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const webhookInstance = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Add logging before verification
    console.log("🛠️ Incoming Headers:", req.headers);
    console.log("📥 Raw Body:", JSON.stringify(req.body, null, 2));

    await webhookInstance.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    console.log("🔔 Clerk Webhook Event Type:", type);
    console.log("📦 Clerk Webhook Data:", JSON.stringify(data, null, 2));

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        console.log("✅ Creating User:", userData);
        await User.create(userData);
        return res.status(200).json({ success: true, message: "user.created handled" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        console.log("♻️ Updating User:", userData);
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ success: true, message: "user.updated handled" });
      }

      case "user.deleted": {
        console.log("🗑️ Deleting User ID:", data.id);
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true, message: "user.deleted handled" });
      }

      default:
        console.log("⚠️ Unhandled Webhook Event Type:", type);
        return res.status(200).json({ success: true, message: "Unhandled event" });
    }
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    res.status(500).json({ success: false, message: "Webhook error" });
  }
};*/


import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database

export const clerkWebhooks = async (req, res) => {
    try{
            // Create a Svix instance with clerk 

            const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

            //verify headers
            await whook.verify(JSON.stringify(req.body), {
                "svix-id" : req.headers["svix-id"],
                "svix-timestamp" : req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            })

          // Getting data from request body

          const { data, type} = req.body

          // Switch Cases for different Events

          switch (type) {
            case 'user.created':{

                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    name : data.first_name + " "+ data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
              res.json({})
                break;

            }
            case 'user.updated':{
                const userData = { 
                    email: data.email_addresses[0].email_addresses,
                    name : data.first_name + " "+ data.last_name,
                    image: data.image_url,
                  
                }

                await User.findByIdAndUpdate(data.id, userData)
                res.json({})

                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
               res.json({})
                break;
                
                
            }
            default:
                break;
          }


    }
    catch (error) {
        console.log(error.message)
        res.json({success:false,message:'Webhooks Error'})

    }

}