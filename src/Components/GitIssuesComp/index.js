import React, { useState, useRef, useCallback, useEffect } from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import GitIssuesCard from './GitIssuesCard'

const Robotography = styled('Typography')({
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 24,
    padding: '10px 12px',
    marginBottom: 20,

});


export default function GitIssuesHome() {
    const observer = useRef()
    const [pageIssues, setPageIssues] = useState([]);
    const [fetchingIssues, setFetchingIssues] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);


    // using this for fetching the results
    const fetchPageIssues = async (value) => {
        setFetchingIssues(true);
        try {
            const data = await fetch(`https://api.github.com/repos/facebook/react/issues?page=${value}`);
            const finalData = await data.json();
            console.log(finalData);

            //using set here to filter duplicates
            setPageIssues(prevIssues => {
                return [...new Set([...prevIssues, ...finalData])]
            })
            setPageNumber((pV) => pV + 1);
            setFetchingIssues(false);

        } catch (err) {
            console.log(err)
            setFetchingIssues(false);

        }
    }


    // using this for tracking end of page
    const lastIssueElemenetRef = useCallback(node => {
        if (fetchingIssues) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {


                fetchPageIssues(pageNumber);

            }
        })
        if (node) observer.current.observe(node)
    }, [fetchingIssues])

    useEffect(() => {
        fetchPageIssues(pageNumber)


    }, [])

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
                fetchingIssues && <Robotography >
                    Loading...
                </Robotography>
            }

        </div>
    )
}