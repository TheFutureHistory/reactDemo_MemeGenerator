import React from "react"

export default function Body(){

    const [meme, setMeme] = React.useState(
        {
            top_text: "",
            bottom_text: "",
            randomImage: ""
        }
    )

    function handleData(event){
        const  {name, value}= event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name] : value
            }
        })
    }

    const [allMemes, setAllMemes] = React.useState([])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    console.log("getting image")
    React.useEffect(() =>{
        fetch(`https://api.imgflip.com/get_memes`)
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])


    return (
        <div className="body_section"> 

            <section className="generator_section">
                <section className="input_section">
                    <input className="input_field" type="text" name="top_text" onChange={handleData} value={meme.top_text}></input>
                    <input className="input_field" type="text" name="bottom_text" onChange={handleData} value={meme.bottom_text}></input>
                </section>
                <button className="generate_btn" onClick={getMemeImage}>GENERATE NEW MEME</button>
            </section>
            
            <section className="image_section">
                <img src={meme.randomImage}></img>
                <h2 className="top_text meme_text">{meme.top_text}</h2>
                <h2 className="bottom_text meme_text" >{meme.bottom_text}</h2>
            </section>

        </div>
    )
}