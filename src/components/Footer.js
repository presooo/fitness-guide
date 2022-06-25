import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/footer-logo.png';

const Footer = () => {
    return (
        <Box mt="80px" bgcolor="#fff3f4">
            <Stack gap="30px" alignItems='center' px="40px" pt="24px">
                <img src={Logo} width="75px" height="70px" />
                <Typography variant="h5" pb="50px" mt="5px">Made by Preslav Atanaschev</Typography>
            </Stack>
        </Box>
    )
}

export default Footer