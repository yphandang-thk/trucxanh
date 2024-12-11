import React, { useState, useEffect } from "react";
const lengthCard = 30;

const HomePage = () => {
    const [open, setOpen] = useState(false);

    const [round, setRound] = useState(1);
    // const generateCards = () => {
    //     const images = Array.from({ length: lengthCard }, (_, i) => `/images/items2/img-${i + 1}.jpg`);
    //     const pairedImages = [...images, ...images];
    //     return pairedImages.sort(() => Math.random() - 0.5);
    // };

    const generateCards = () => {
        const folder = round === 1 ? 'items1' : 'items2';
        const images = Array.from({ length: lengthCard }, (_, i) => `/images/${folder}/img-${i + 1}.jpg`);
        const pairedImages = [...images, ...images];
        return pairedImages.sort(() => Math.random() - 0.5);
    };

    // const [initializing, setInitializing] = useState(true);
    // const [teamNames, setTeamNames] = useState([]);
    // const [cards, setCards] = useState(generateCards());
    // const [flipped, setFlipped] = useState(Array(lengthCard * 2).fill(false));
    // const [currentPair, setCurrentPair] = useState([]);
    // const [scores, setScores] = useState(Array(teamNames.length).fill(0));
    // const [currentTeam, setCurrentTeam] = useState(0);
    // const [mergeEffect, setMergeEffect] = useState(null);
    // const [success, setSuccess] = useState(false);
    // const [activeFlipped, setActiveFlipped] = useState(Array(lengthCard * 2).fill(false));
    const [initializing, setInitializing] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.initializing;
        }
        return true;
    });

    const [teamNames, setTeamNames] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.teamNames || [];
        }
        return [];
    });

    const [cards, setCards] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.cards || generateCards();
        }
        return generateCards();
    });

    const [flipped, setFlipped] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.flipped || Array(lengthCard * 2).fill(false);
        }
        return Array(lengthCard * 2).fill(false);
    });

    const [currentPair, setCurrentPair] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.currentPair || [];
        }
        return [];
    });

    const [scores, setScores] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.scores || Array(teamNames.length).fill(0);
        }
        return Array(teamNames.length).fill(0);
    });

    const [currentTeam, setCurrentTeam] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.currentTeam || 0;
        }
        return 0;
    });

    const [mergeEffect, setMergeEffect] = useState(null);

    const [success, setSuccess] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.success || false;
        }
        return false;
    });

    const [activeFlipped, setActiveFlipped] = useState(() => {
        const savedGameState = localStorage.getItem("memoryGameState");
        if (savedGameState) {
            const data = JSON.parse(savedGameState);
            return data.activeFlipped || Array(lengthCard * 2).fill(false);
        }
        return Array(lengthCard * 2).fill(false);
    });

    const handleCardClick = (index) => {
        if (flipped[index] || currentPair.length === 2) return;
        const newFlipped = [...flipped];
        newFlipped[index] = true;
        setFlipped(newFlipped);
        setCurrentPair([...currentPair, index]);
    };

    const startGame = () => {
        setScores(Array(teamNames.length).fill(0));
        localStorage.removeItem("memoryGameState");
        setCards(generateCards());
        setInitializing(false);
    };

    const handleRestart = () => {
        setOpen(false);
        setInitializing(true);
        setScores(Array(teamNames.length).fill(0));
        setCards(generateCards());
        setCurrentPair([]);
        setFlipped(Array(lengthCard * 2).fill(false));
        setActiveFlipped(Array(lengthCard * 2).fill(false));
        setCurrentTeam(0);
        setTeamNames([]);
        localStorage.removeItem("memoryGameState");

    }

    useEffect(() => {
        if (currentPair.length === 2) {
            const [first, second] = currentPair;

            if (cards[first] === cards[second]) {
                const newActiveFlipped = [...activeFlipped];
                newActiveFlipped[first] = true;
                newActiveFlipped[second] = true;
                setActiveFlipped(newActiveFlipped);
                setSuccess(true);
                const newScores = [...scores];
                newScores[currentTeam]++;
                setScores(newScores);
                const audio = document.getElementById("audio");
                audio.volume = 1;
                audio.play();
            } else {
                setMergeEffect({ first, second });
                setTimeout(() => {
                    const newFlipped = [...flipped];
                    newFlipped[first] = false;
                    newFlipped[second] = false;
                    setFlipped(newFlipped);
                }, 2000);
            }
            setCurrentPair([]);
            setTimeout(() => {

                setCurrentTeam((prev) => (prev + 1) % teamNames.length);
                setSuccess(false);
            }, 2000);
        }
    }, [currentPair]);

    useEffect(() => {
        if (mergeEffect) {
            setTimeout(() => {
                setMergeEffect(null);
            }, 2000);
        }
    }, [mergeEffect]);

    useEffect(() => {
        const gameState = {
            cards,
            flipped,
            activeFlipped,
            scores,
            currentTeam,
            teamNames,
            initializing,
            currentPair
        };
        localStorage.setItem("memoryGameState", JSON.stringify(gameState));

    }, [cards, flipped, activeFlipped, scores, currentTeam, teamNames, initializing]);

    if (initializing) {
        return (
            <>
                <div style={{
                    backgroundImage: "url(images/BackgroupGame.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "100%",
                    backgroundPosition: "center",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    zIndex: "-1"
                }}>

                </div>
                <div style={{
                    textAlign: "center", padding: "30px", background: "none",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "700px",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "10px"
                }}>
                    <h1>
                        <img src="images/title.png" />
                    </h1>
                    {teamNames.map((team, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <input
                                type="text"
                                value={team}
                                placeholder={`Tên đội ${index + 1}`}
                                onChange={(e) => {
                                    const newTeamNames = [...teamNames];
                                    newTeamNames[index] = e.target.value;
                                    setTeamNames(newTeamNames);
                                }}
                                style={{
                                    height: "38px",
                                    padding: "0 10px",
                                    outline: "0"
                                }}
                            />
                        </div>
                    ))}
                    <div>
                        <button
                            onClick={() => setTeamNames([...teamNames, ""])}
                            style={{
                                color: "#000",
                                fontSize: "18px",
                                borderRadius: "5px",
                                border: "none",
                                background: "none",
                                cursor: "pointer"
                            }}
                        >
                            <img src="images/game_add.png" style={{ width: "300px" }} />
                        </button>
                    </div>
                    <div>
                        <button style={{
                            color: "#000",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            filter: round == 1 ? 'grayscale(0%)' : 'grayscale(100%)'
                        }}
                            onClick={() => setRound(1)}
                        >
                            <img src="images/btn_round1.png" style={{ width: "300px" }} />
                        </button>
                        <button style={{
                            color: "#000",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            filter: round == 2 ? 'grayscale(0%)' : 'grayscale(100%)'
                        }}
                            onClick={() => setRound(2)}
                        >
                            <img src="images/btn_round2.png" style={{ width: "300px" }} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={startGame}
                            disabled={teamNames.some((name) => name.trim() === "") || teamNames.length === 0}
                            style={{
                                background: "none",
                                color: "#FFF",
                                fontSize: "18px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            <img src="images/btn_play.png" style={{ width: "300px" }} />
                        </button>
                    </div>
                </div >
            </>
        );
    }

    return (
        <>

            <div style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "1000",
                background: "rgba(0,0,0,0.5)",
                display: open ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center"
            }}>

                <div
                    style={{
                        background: "#FFF",
                        padding: "30px",
                        borderRadius: "10px",
                        minWidth: "400px"
                    }}
                >
                    <h3 style={{
                        fontSize: "30px",
                        fontWeight: "normal"
                    }}>Bạn có chắc chắn muốn reset game?</h3>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <button type="button" style={{
                            color: "#000",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                        }}
                            onClick={handleRestart}
                        >
                            <img src="images/btn_yes.png" />
                        </button>
                        <button type="button" style={{
                            color: "#000",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                        }} onClick={() => setOpen(false)}>
                            <img src="images/btn_no.png" />
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
                    * {
                    box-sizing: border-box
                    }
                `}
            </style>
            <iframe
                width="0"
                height="0"
                src="https://www.youtube.com/embed/clhNFJ_4YUk?autoplay=1&loop=1&playlist=clhNFJ_4YUk"
                title="Squid Game Remix - Squid Game Remix ( DuyNh Prod Remix ) | Tiktok Songs 2021"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ opacity: "0" }}
            >
            </iframe>
            {round == 1 && (
                <iframe
                    width="0"
                    height="0"
                    src="https://www.youtube.com/embed/JsPBrVjKAJA?si=-EBtj_G7cmyrx5C9&autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

                </iframe>
            )}
            {round == 2 && (
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/LRLq2t5IlKI?si=GG4WxpCrEY4lXKGh&autoplay=1"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

                </iframe>
            )}

            <audio id="audio" src="images/tada.wav" style={{ position: "fixed", zIndex: "-11111" }}></audio >
            <button
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    zIndex: "9999",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                }}
                onClick={() => setOpen(true)}
            >
                <img src="images/game_restart.png" />
            </button>
            <div style={{
                background: "url(images/BackgroupGame.jpg)",
                padding: " 10px",
                top: '0',
                left: '0',
                width: "100%",
                height: "100%",
                position: "fixed",
                overflow: "auto"
            }}>

                <div style={{
                    display: "flex",
                    gap: "30px",
                    justifyContent: "center",

                }}>
                    {teamNames.map((team, index) => (
                        <div
                            key={index}
                            style={{
                                width: "300px",
                                background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
                                padding: "10px 30px",
                                fontSize: "20px",
                            }}
                        >
                            {team}: {scores[index]} điểm
                        </div>
                    ))}
                </div>
                <h2 style={{ textAlign: "center", padding: "0px" }}>Lượt chơi của: {teamNames[currentTeam]}</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: " 5px solid #FFF",
                                borderRadius: "5px",
                                boxShadow: "5px 5px 50px rgba(255,255,255, 1)"
                            }}
                        >
                            <div style={{
                                width: "100%",
                                background: flipped[index] ? "lightblue" : "linear-gradient(to bottom, #a8e063, #56ab2f)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                paddingTop: "100%",
                                position: "relative",

                                opacity: activeFlipped[index] ? "0" : "1"
                            }}
                                onClick={() => handleCardClick(index)}>

                                {flipped[index] ? (
                                    <img
                                        src={card}
                                        alt={`Card ${index}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            position: "absolute",
                                            top: "0",
                                            left: "0"
                                        }}
                                    />
                                ) : ""}
                            </div>
                        </div>
                    ))}
                </div>
            </div >

            {
                mergeEffect && (
                    <>
                        <div style={{
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            top: "0",
                            left: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "30px"
                            }}>
                                <div>
                                    <img
                                        src={cards[mergeEffect.first]}
                                        style={{
                                            width: "40vw",
                                            height: "40vw"
                                        }}
                                    />
                                </div>
                                <div>
                                    <img
                                        src={cards[mergeEffect.second]}
                                        style={{
                                            width: "40vw",
                                            height: "40vw"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {
                success && (
                    <div style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <img src="images/giphy.gif" />
                    </div>
                )
            }
        </>
    );
}

export default HomePage;