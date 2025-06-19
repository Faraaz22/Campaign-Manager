
const express =require("express")
const db =  require("../config/db")
const auth = require("../middleware/auth")
const router = express.Router()

router.use(auth)

// get all campaigns
router.get("/", async (req, res) =>{
    const [rows] = await db.execute("SELECT * FROM campaigns")
    res.json(rows)
})

// add campaign
router.post('/', async (req,res)=>{
    const {name, date, impressions,clicks,conversions} = req.body
    await db.execute('INSERT INTO campaigns (name, date, impressions,clicks,conversions) VALUES (?,?,?,?,?)',
        [name, date, impressions,clicks,conversions])
    res.json({message: "Campaign added"})
})

// update campaign
router.put('/:id', async (req, res) => {
  const { name, date, impressions, clicks, conversions } = req.body;
  const { id } = req.params;

  console.log('Update request for ID:', id);
  console.log('Data:', req.body);

  try {
    const [result] = await db.execute(
      'UPDATE campaigns SET name=?, date=?, impressions=?, clicks=?, conversions=? WHERE id=?',
      [name, date, impressions, clicks, conversions, id]
    );

    console.log('Update result:', result);
    res.json({ message: 'Campaign updated' });
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(500).json({ message: 'Database update failed', error: err.message });
  }
});


// delete campaign
router.delete('/:id', async (req, res)=>{
    await db.execute('DELETE FROM campaigns WHERE id=?', [req.params.id])
    res.json({message:'Deleted'})
})

module.exports = router