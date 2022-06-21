import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button, TextField } from '@mui/material';
import { exerciseApiOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';


const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchBodyPartData = async () => {
            const data = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseApiOptions);

            setBodyParts(['all', ...data]);
        }

        fetchBodyPartData();
    }, [])


    const handleSearch = async () => {
        if (search) {
            const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseApiOptions);

            const searched = exerciseData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                    || exercise.target.toLowerCase().includes(search)
                    || exercise.equipment.toLowerCase().includes(search)
                    || exercise.bodyPart.toLowerCase().includes(search)
            );

            setSearch('');
            setExercises(searched);
        }
    }

    return (
        <Stack alignItems="center" mt="37px" p="20px" justifyContent="center">
            <Typography fontWeight={700} sx={{
                fontSize: { lg: '44px', xs: '40px' }
            }} mb="50px" textAlign="center">
                Awesome Exercises You <br /> Should Know
            </Typography>

            <Box position="relative" mb="72px">
                <TextField
                    sx={{
                        input: { fontWeight: "700", border: "none", borderRadius: "4px" },
                        width: { lg: "800px", xs: "350px" },
                        backgroundColor: "#fff",
                        borderRadius: "40px"
                    }}
                    height="76px"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value.toLowerCase()) }}
                    placeholder="Search Exercises"
                    type="text"
                />

                <Button className="search-btn"
                    sx={{
                        bgcolor: '#ff2625',
                        color: "#fff",
                        textTransform: "none",
                        width: { lg: "175px", xs: "80px" },
                        fontSize: { lg: "20px", xs: "14px" },
                        height: "56px",
                        position: "absolute",
                        right: "0"
                    }}
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
            </Box>
        </Stack>
    )
}

export default SearchExercises