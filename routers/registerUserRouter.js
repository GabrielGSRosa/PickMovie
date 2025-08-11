import express from 'express';
import {faker} from '@faker-js/faker';

const router = express.Router();

router.get('/nomes', (req,res) => {
    const nome = faker.person.fullName();

    res.json({nome});
})

export default router;