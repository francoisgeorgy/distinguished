import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import Markdown from "markdown-to-jsx";
import {indexToXY} from "../model";
import {stores} from "../stores";

export const AlgorithmDescription = observer(() => {

    // const filename = "C8.md";

    const xy = indexToXY(stores.state.currentAlgorithm);

    const [text, setText] = useState('');

    useEffect(() => {
        fetch(`/app/texts/${xy}.md`)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                else {
                    setText("");
                    // return Promise.reject("Failed to load text");
                    return Promise.reject("text not found");
                }
            })
            .then((text) => {
                setText(text);
            })
            .catch((error) => {
                setText("");
                console.log(error)
            });
    }, [xy]);

    console.log("AlgorithmDescription");

    return (
        <div className="algorithm-description">
            <Markdown>
                {text}
            </Markdown>
        </div>
    );
});
