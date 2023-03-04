import { Typography } from '@mui/material';
import React, { useEffect } from 'react'

function GitIssuesCard(props) {
    const { gitIssue } = props;


    useEffect(() => {

    }, [])
    return (

        <div className='rowStyles' style={{ padding: 10, display: 'flex', justifyContent: 'space-between', }}>
            <div className='columnStyles' style={{ padding: 10, maxWidth: '80%' }}>

                <div className='rowStyles'>
                    <Typography>

                    </Typography>
                    <Typography style={{
                        margin: '0 2px', fontFamily: 'Roboto', color: 'white'
                    }}>
                        {gitIssue.title}
                    </Typography>
                    <Typography>

                    </Typography>

                </div>
                <Typography style={{
                    margin: '0 2px', fontFamily: 'Roboto', color: 'white'
                }}>
                    #{gitIssue.number} opened  by {gitIssue.user.login}
                </Typography>
                <div>

                </div>
            </div>
            <div >
                <Typography style={{
                    margin: '0 2px', fontFamily: 'Roboto', color: 'white'
                }}>
                    {gitIssue.comments} comments
                </Typography>

            </div>

        </div>
    )
}

export default GitIssuesCard