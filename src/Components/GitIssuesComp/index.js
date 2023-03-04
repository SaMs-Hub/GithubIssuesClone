import React, { useState, useRef, useCallback, useEffect } from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import GitIssuesCard from './GitIssuesCard'

const Robotography = styled('Typography')({
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 24,
    padding: '10px 12px'

});


export default function GitIssuesHome() {
    const observer = useRef()
    const [pageIssues, setPageIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchPageIssues = async (value) => {
        setLoading(true);
        try {
            const data = await fetch(`https://api.github.com/repos/facebook/react/issues?page=${value}`);
            const finalData = await data.json();
            console.log(finalData);
            setPageIssues(prevIssues => {
                return [...new Set([...prevIssues, ...finalData])]
            })
            setPageNumber((pV) => pV + 1);


            setLoading(false);

        } catch (err) {
            console.log(err)
            setLoading(false);

        }
    }

    console.log(pageIssues[0]);

    const lastIssueElemenetRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {


                fetchPageIssues(pageNumber);

            }
        })
        if (node) observer.current.observe(node)
    }, [loading])

    useEffect(() => {
        fetchPageIssues(pageNumber)


    }, [])
    console.log(pageIssues.length);

    return (
        <div>

            {pageIssues?.length > 0 && pageIssues?.map((item, index) => {
                if (pageIssues?.length === index + 1) {
                    return (

                        <div key={index} ref={lastIssueElemenetRef}>
                            <GitIssuesCard key={index} gitIssue={item} />

                        </div>
                    )
                } else return (
                    <GitIssuesCard key={index} gitIssue={item} />
                )

            })}
            {
                loading && <Robotography >
                    Loading...
                </Robotography>
            }

        </div>
    )
}