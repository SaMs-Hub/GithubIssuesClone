import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import moment from 'moment'

function GitIssuesCard(props) {
    const { gitIssue } = props;

    const [createdTime, setCreatedTime] = useState(moment(gitIssue.created_at).fromNow());
    const [closedTime, setClosedTime] = useState(moment(gitIssue.closed_At).fromNow());


    return (

        <div className='rowStyles' style={{ padding: 10, display: 'flex', justifyContent: 'space-between', }}>
            <div className='columnStyles' style={{ padding: 10, maxWidth: '80%' }}>

                <div className='rowStyles'>

                    <Typography style={{
                        margin: '0 2px', fontFamily: 'Roboto', color: 'white'
                    }}>
                        {gitIssue.title}
                    </Typography>
                    <div className='rowStyles' style={{
                        marginLeft: 20
                    }}>
                        {gitIssue.labels.map((label, labelIndex) => {
                            let isOpenedByCoreTeam = label.name === "React Core Team"
                            return (
                                <div className='centerRow' style={{
                                    borderRadius: 8, border: isOpenedByCoreTeam ? `0.1px solid #c4a0e6` : `0.1px solid #e7e7e7`, margin: '0 2px', color: isOpenedByCoreTeam ? '#c4a0e6' : 'white',
                                }}>
                                    <Typography style={{
                                        fontFamily: 'Roboto', fontSize: 10, margin: '0 10px '
                                    }}>
                                        {label.name}
                                    </Typography>
                                </div>
                            )
                        })}

                    </div>

                </div>

                {gitIssue.closed_At != null ?
                    <Typography style={{
                        margin: '0 2px', fontFamily: 'Roboto', color: 'white'
                    }}>
                        #{gitIssue.number} by {gitIssue.user.login} closed at {closedTime}
                    </Typography>
                    : <Typography style={{
                        margin: '0 2px', fontFamily: 'Roboto', color: 'white'
                    }}>
                        #{gitIssue.number} opened {createdTime} by {gitIssue.user.login}
                    </Typography>
                }

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