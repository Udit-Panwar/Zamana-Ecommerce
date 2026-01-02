const {Webhook} = require('svix');
const User = require('../models/User');

exports.clerkWebhooks = async(req, res) => {
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        })

        const {data,type} = req.body;

        switch(type){
            case 'user.created':
                {
                    const { id, email_addresses, first_name, last_name } = data;
                
                    const email = email_addresses?.[0]?.email_address;
                
                      let user = await User.findOne({ clerkId: id });
                
                      if (!user) {
                        user = await User.create({
                          clerkId: id,
                          email,
                          name: `${first_name || ""} ${last_name || ""}`.trim(),
                        });
                      }
                
                    console.log("🎉 User saved in DB:", user);
                
                    res.status(200).json({ success: true });
                    break;
                }
                default:
                    res.status(400).json({ error: 'Unhandled webhook type' });
        }
    } catch(err){
        console.error('❌ Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: 'Invalid webhook signature' });    
    }
}