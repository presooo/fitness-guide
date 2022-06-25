import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseApiOptions, fetchData, youtubeApiOptions } from '../utils/fetchData';

import Detail from '../components/Detail';
import Videos from '../components/Videos';
import Similar from '../components/Similar';

const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [youtubeVideos, setYoutubeVideos] = useState({});
    const [targetMuscleExercises, setTargetMuscleExercises] = useState({});
    const [equipmentExercises, setEquipmentExercises] = useState({});
    const { id } = useParams();

    useEffect(() => {

        const fetchExerciseData = async () => {

            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseApiOptions);
            setExerciseDetail(exerciseDetailData);

            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
            const youtubeVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeApiOptions);
            setYoutubeVideos(youtubeVideosData.contents);

            const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseApiOptions);
            setTargetMuscleExercises(targetMuscleExerciseData);

            const equipmentExerciseData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseApiOptions);
            setEquipmentExercises(equipmentExerciseData);

        }

        fetchExerciseData();

    }, [id])


    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail} />
            <Videos youtubeVideos={youtubeVideos} name={exerciseDetail.name} />
            <Similar targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
        </Box>
    )
}

export default ExerciseDetail