import { useEffect, useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    imagenUrl: string;
}

interface Props {
    id: number;
}

export const usePokemon = ({id}: Props) => {
  
    const [pokemon, setpokemon] = useState<Pokemon | null>(null)
    const [isLoading, setisLoading] = useState(true)
    
    useEffect(() => {
        const getPokemonById = async () => {
        try {
            setisLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setpokemon({
            id: data.id,
            name: data.name,
            imagenUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            });

            setisLoading(false);
        } catch (error) {
            console.error("Error cargando Pokémon", error);
        } 
        };

        getPokemonById();

    }, [id])
    


    return {
        pokemon,
        isLoading,
        formattedId: id.toString().padStart(3, '0')
    }
}
