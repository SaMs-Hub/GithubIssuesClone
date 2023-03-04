import React from 'react'

import { Typography } from '@mui/material';
import GitIssuesHome from '../../Components/GitIssuesComp';

function MyGitIssues() {
    return (
        <div className='columnAlign' style={{ padding: '0.1% 1%', width: '90vw' }}>
            <div className='centerRow' style={{
                background: '#35355f', width: '100%', borderRadius: 8
            }}>
                <Typography style={{
                    fontSize: 30, fontFamily: 'Roboto', color: 'white'
                }}>
                    React Git Issues

                </Typography>
            </div>

            <div style={{

                width: '100%', background: '#22272e', marginTop: 20, borderRadius: 8,
            }}>
                <GitIssuesHome />
            </div>

        </div>
    )
}

export default MyGitIssues