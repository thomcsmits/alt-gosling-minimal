
import { useEffect, useRef, useState } from 'react';
import gosling, { GoslingComponent } from 'gosling.js';
import type { Datum } from 'gosling.js/dist/src/gosling-schema';
import PubSub from 'pubsub-js';

import Button from '@mui/material/Button';


interface AltGoslingCompProps {
    spec?: gosling.GoslingSpec,
    theme?: 'light' | 'dark',
    test?: boolean
}


export const AltGoslingComponent = (props: AltGoslingCompProps) => {

    // gosling ref
    const gosRef = useRef<gosling.GoslingRef>(null);

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const changeSomething = () => {
        console.log(theme)
        setTheme('dark')
    }
 
    // Directly subscribe to the `rawData` event when the component is mounted
    useEffect(() => {
        // rawData
        PubSub.subscribe("rawData", (_: string, data: {id: string, data: Datum[]}) => {
            console.log("rawData", data);
        });
        return () => {
            PubSub.unsubscribe("rawData");
        }
    }, []);

    // Option 1: UseEffect
    useEffect(() => {
        if (gosRef.current) {
            const currentRef = gosRef.current;
            // specProcessed
            currentRef.api.subscribe("specProcessed", (_: string, data: {id: string, spec: gosling.GoslingSpec}) => {
                console.log("specProcessed", data);
               

            });
        }
        return () => {
            gosRef.current?.api.unsubscribe('specProcessed');
        }
    }, [gosRef.current]);

    // // Option 2: direct if-statement
    // if (gosRef.current) {
    //     const currentRef = gosRef.current;
    //     // specProcessed
    //     currentRef.api.subscribe("specProcessed", (_: string, data: {id: string, spec: gosling.GoslingSpec}) => {
    //         console.log("specProcessed", data);
            

    //     });
    //     //rawData
    //     currentRef.api.subscribe("rawData", (_: string, data: {id: string, data: Datum[]}) => {
    //         console.log("rawData", data);
    //     });
    // }

    return(
        <>
            <GoslingComponent ref={gosRef} spec={props.spec} theme={theme}/>
            <Button variant="contained" onClick={changeSomething}>Reset example</Button>
        </>
    )
}

export default AltGoslingComponent;
