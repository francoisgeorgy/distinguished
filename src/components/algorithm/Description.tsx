import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import Markdown from "markdown-to-jsx";
import {stores} from "../../stores";
import "./Description.css";

export const Description = observer(() => {

    // const filename = "C8.md";

    // const xy = indexToXY(stores.state.currentAlgorithm);
    const index = stores.state.currentAlgorithm;

    const [text, setText] = useState('');

    useEffect(() => {
        fetch(`/distinguished/texts/${index}.md`)
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
    }, [index]);

    console.log("AlgorithmDescription");

    return (
        <div className="algorithm-description">
            <Markdown>
                {text}
            </Markdown>
        </div>
    );
});
