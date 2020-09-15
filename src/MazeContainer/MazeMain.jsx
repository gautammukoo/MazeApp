import React from 'react';
import { withStyles } from "@material-ui/core/styles";

//Add style classes for elements
const styles = () => ({
    rootTable : {
        borderCollapse:"collapse"
    },
    rootBody : {
        border:"1px solid black",
        minWidth:"60px",
        height:"60px",
        boxSizing:"border-box"
    },
    playerImg : {
        backgroundRepeat: "no-repeat",
        height:"40px",
        width:"40px",
        margin:"auto !important",
        display:"block"
    }
})

//Player Image src
const playerImg = {
    url : require("../images/player_mario.jpg")
}

//Sprites Image src
const spritesImg = {
    url : require("../images/green_sprites.jpg")
}

class MazeMain extends React.Component {
    constructor() {
        super();
        this.state = {
            row:0,
            column:0,
            player : {
                rowLimit : 0,
                colLimit : 0,
                pos : [],
                steps: 0,
            },
            totalSprites : []
        }
        this.enterGridDetails = this.enterGridDetails.bind(this);
        this.setSprites = this.setSprites.bind(this);
    }

    componentDidMount() {
        this.enterGridDetails();
    }

    //To enter maze board details
    enterGridDetails() {
        const col = Number(window.prompt("Please enter board Width", "")) //Enter Column
        const row = Number(window.prompt("Please enter board Height", "")) //Enter Row

        //Added check for row and col less than 50
        this.setState({row:row > 50 ? 50 : row, 
            column:col > 50 ? 50: col}, 
            () => {
            let player = this.state.player
            player.rowLimit = this.state.row - 1
            player.colLimit = this.state.column - 1
            player.pos[0] = Math.floor(player.rowLimit / 2)//To set position of player near the middle
            player.pos[1] = Math.floor(player.colLimit / 2)//To set position of player near the middle
            this.setState({player:player})
            this.setSprites();
        })
    }

    //To set sprites position in maze board
    setSprites() {
            if(this.state.row === this.state.column) {
                let count = this.state.row;
                let totalSprites = this.state.totalSprites
                while(totalSprites.length < count && count !== 1) {
                   let row = Math.floor(Math.random() * Math.floor(count))
                   let col = Math.floor(Math.random() * Math.floor(count))
                   let res = totalSprites.find((r) => {
                    if(r.row === row && r.col === col) return r
                    else if(r.row === this.state.player.pos[0] && r.col === this.state.player.pos[1]) return r
                    else if(row === this.state.player.pos[0] && col === this.state.player.pos[1]) return r
                    else return null
                   })
                   if(res) {}
                   else totalSprites.push({row:row, col:col})  
                }
                this.setState({totalSprites:totalSprites})
            }
            else {
                let count = this.state.row < this.state.column ? this.state.row : this.state.column;
                let totalSprites = this.state.totalSprites
                while(totalSprites.length < count) {
                   let row = Math.floor(Math.random() * Math.floor(count))
                   let col = Math.floor(Math.random() * Math.floor(count))
                   let res = totalSprites.find((r) => {
                    if(r.row === row && r.col === col) return r
                    else if(r.row === this.state.player.pos[0] && r.col === this.state.player.pos[1]) return r
                    else if(row === this.state.player.pos[0] && col === this.state.player.pos[1]) return r
                    else return null
                   })
                   if(res) {}
                   else totalSprites.push({row:row, col:col})  
                }
                this.setState({totalSprites:totalSprites})
            }
    }

    //To select the maze board
    onKeyPressed(e) {
        let player = this.state.player
        if(e.key === "ArrowRight" && player.colLimit > player.pos[1]) {
            let index = 0;
            player.pos[1]++
            player.steps++
            let res = this.state.totalSprites.find((el, ind) => {
                if(el.row === player.pos[0] && el.col === player.pos[1]) {
                    index = ind;
                    return el
                }
                else return null
            })
            if(res) {
                let totalSprites = this.state.totalSprites
                totalSprites.splice(index,1)
                this.setState({totalSprites:totalSprites, player:player}, () => {
                    if(this.state.totalSprites.length === 0) {
                        window.alert(`Game over. Total moves to save princess: ${this.state.player.steps}`)
                    }
                })
            }
            else {
                this.setState({player:player})
            }
        }
        else if(e.key === "ArrowLeft" && player.pos[1] !== 0) {
            let index = 0;
            player.pos[1]--
            player.steps++
            let res = this.state.totalSprites.find((el, ind) => {
                if(el.row === player.pos[0] && el.col === player.pos[1]) {
                    index = ind;
                    return el
                }
                else return null
            })
            if(res) {
                let totalSprites = this.state.totalSprites
                totalSprites.splice(index,1)
                this.setState({totalSprites:totalSprites, player:player},() => {
                    if(this.state.totalSprites.length === 0) {
                        window.alert(`Game over. Total moves to save princess: ${this.state.player.steps}`)
                    }
                })
            }
            else {
                this.setState({player:player})
            }
        }
        else if(e.key === "ArrowDown" && player.rowLimit > player.pos[0]) {
            let index = 0;
            player.pos[0]++
            player.steps++
            let res = this.state.totalSprites.find((el, ind) => {
                if(el.row === player.pos[0] && el.col === player.pos[1]) {
                    index = ind;
                    return el
                }
                else return null
            })
            if(res) {
                let totalSprites = this.state.totalSprites
                totalSprites.splice(index,1)
                this.setState({totalSprites:totalSprites, player:player}, () => {
                    if(this.state.totalSprites.length === 0) {
                        window.alert(`Game over. Total moves to save princess: ${this.state.player.steps}`)
                    }
                })
            }
            else {
                this.setState({player:player})
            }
        }
        else if(e.key === "ArrowUp" && player.pos[0] !== 0) {
            let index = 0;
            player.pos[0]--
            player.steps++
            let res = this.state.totalSprites.find((el, ind) => {
                if(el.row === player.pos[0] && el.col === player.pos[1]) {
                    index = ind;
                    return el
                }
                else return null
            })
            if(res) {
                let totalSprites = this.state.totalSprites
                totalSprites.splice(index,1)
                this.setState({totalSprites:totalSprites, player:player}, () => {
                    if(this.state.totalSprites.length === 0) {
                        window.alert(`Game over. Total moves to save princess: ${this.state.player.steps}`)
                    }
                })
            }
            else {
                this.setState({player:player})
            }
        }
    }

    //Function to add column in maze board
    addCol(rowNumber) {
        let { classes } = this.props;
        let res = [];
        for(let j = 0; j < this.state.column; j++) {
        res.push(
        <td 
            key = {j.toString()} 
            className={classes.rootBody}>
                    {this.state.player.pos[0] === rowNumber && this.state.player.pos[1] === j ?
                    <span
                    className={classes.playerImg}
                    style={{
                      backgroundImage: `url(${playerImg.url})`,
                      margin: "30px 34px",
                    }}
                    />
                    : null}
                    {this.state.totalSprites.map(val => {
                        if(val.row === rowNumber && val.col === j) {
                            return (
                                <span
                                key={`${val.row}_${val.col}`}
                                className={classes.playerImg}
                                style={{
                                backgroundImage: `url(${spritesImg.url})`,
                                margin: "30px 34px",
                                }}
                            />
                            )
                        }
                        else return <React.Fragment key={`${val.row}_${val.col}`}></React.Fragment>
                    })}
        </td>
        )}
        return res;
    }

    render() {
    let { classes } = this.props;
    let displayGrid = [];
    
    for(let i = 0; i < this.state.row; i++) {
        displayGrid.push(<tr key={i.toString()}>{this.addCol(i)}</tr>)
    }
        return (
            <div
                className="player"
                style={{ position: "absolute" }}
                onKeyDown={(event) => this.onKeyPressed(event)}
                tabIndex="0"
            >
                <table className={classes.rootTable}>
                    <tbody>
                        {displayGrid ?displayGrid: null}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default withStyles(styles)(MazeMain);