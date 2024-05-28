import Deck from '../models/deck.model.js';
import User from '../models/user.models.js';

export const deckCheck = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req
        console.log(user, 'user')
        // const userId = await Deck.findById(user._id);
        // console.log(userId)
        const deck = await Deck.findOne({ _id: id });
        // console.log(await deck.populate(['crypt._id', 'library._id']), 'deck')
        if (!deck) {
            console.log("Deck not found");
            return res.status(404).json({ message: 'Deck not found' });
        }
        // Verificar si el mazo es público o pertenece al usuario actual
        console.log(deck.isPublic, deck.userId, user._id, '¡¡!!')
        if (!deck.isPublic && (deck.userId !== user._id) ) {
            return res.status(403).json({ message: 'Acceso denegado: este mazo no es publico' });
        }

        req.deck = await deck.populate(['crypt._id', 'library._id']);
        console.log('Deck found:', req.deck);
        next();
    } catch (error) {
        console.log('Error al obtener el ID del mazo', error);
        res.status(400).json({ error: error.message });
    }
}