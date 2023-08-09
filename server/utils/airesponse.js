const router = require('express').Router();

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);
router.post("/chat/airesponse", async (req, res) => {

  try{
    const { prompt } = req.body;
    console.log(prompt)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:`You are a programming algorithm challenger used to challenge and help developers get better at coding.  Your responses are being sent back to a app developers are using. You are being sent Questions
      and Responses that you have sent and responded to. Evaluate the context sent to you and respond accordingly.
      Context From App: ${prompt}
      
      
     `,
      max_tokens: 200,
      temperature: 0.9,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    const responseData = response.data.choices[0].text.trim().replace(/\n/g, "");
    //console.log(responseData)
    return res.status(200).json({
      success: true,
      data: responseData
    });
  } catch(error){
    return res.status(400).json({
      success: false,
      error: error.response
      ? error.response.data
      : "There was an issue on the server"
    });

  }
})
// const port = process.env.PORT || 5000;
// app.listen(port, ()=> console.log(`Server listening on port ${port}`));

module.exports = router;