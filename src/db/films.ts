import mongoose from 'mongoose';

const FilmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    rent: { type: Number, required: false },
    purchase: { type: Number, required: false },
    owner: { type: mongoose.Types.ObjectId, required: true },
    cover: { type: String, required: true },
    trailer: { type: String, required: false },
    video: { type: String, required: true },
});

export const FilmModel = mongoose.model('Film', FilmSchema);

export const getFilms = () => FilmModel.find();
export const getFilmsBySearchTerm = (search: string) => FilmModel.findOne({ search });
export const getFilmById = (id: string) => FilmModel.findById(id);
export const getFilmsByOwner = (owner: string) => FilmModel.find({ owner }).exec();
export const createFilm = (values: Record<string, any>) => new FilmModel(values).save().then((film) => film.toObject());
export const deleteFilmById = (id: string) => FilmModel.findOneAndDelete({ _id: id });
export const updateFilmById = (id: string, values: Record<string, any>) => FilmModel.findByIdAndUpdate(id, values);
export const searchFilmsByTitle = (search: string) => FilmModel.find({ title: { $regex: search, $options: 'i' } });