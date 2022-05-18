import { urls } from '../constants/constants';

export const useFetchPokemon = async (dexNum) => {
    const response = await fetch(`${urls.pokemonPath}/${dexNum}`)
    const { name, sprites: { front_default: img } } = await response.json()

    return [
        name,
        img
    ]
}