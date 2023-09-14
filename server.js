const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.get('/flights', async (req, res) => {
  try {
    const flights = await prisma.flight.findMany()
    res.status(200).json(flights);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/flight',async (req, res)=> {
  const flights = await prisma.flight.create({ data: req.body });
  res.send(flights);
  
})

app.patch('/flight/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFlight = await prisma.flight.update({
      where: {
        flight_name_id: Number(id)
      },
      data: req.body
    });
    res.status(200).json(updatedFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.delete('/flight/:id', async (req, res) => {
  const  id  = req.params;
  const flight = await prisma.flight.delete({
    where: {
      flight_name_id: Number(id)

    },
  });

  res.json(flight);
});

app.listen(5000);
