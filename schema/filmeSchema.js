import mongoose from 'mongoose';

const filmeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    category: [String],
    play: [String],
    banner: {type: String, required: true} 
})

const bannerSchema = new mongoose.Schema({
    banner: { type: String, required: true }
})

const Movie = mongoose.model('MoviesList', filmeSchema, 'MoviesList');
const Banner = mongoose.model('Banner', bannerSchema)

export {Movie, Banner};