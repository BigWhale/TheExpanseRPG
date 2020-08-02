on("chat:message", function(msg) {
    if (msg.type !== "api" ) return

    let args = msg.content.split('|||')
    let response = ""
    let final = ""
    let command = args.shift()

    if (command === '!theexpanse' && args.length) {
        try  {
            let subtype = args.shift()
            if (subtype === 'damage' && args.length === 5) {
                let name = args.shift()
                let dice = args.shift()
                let attribute = args.shift()
                let dmg_bonus = parseInt(eval(args.shift()))
                let modifiers = parseInt(eval(args.shift()))

                dice = []
                msg.inlinerolls[0].results.rolls[0].results.forEach((result) => {
                    dice.push(result.v)
                })

                let total = msg.inlinerolls[0].results.total
                let total_modifiers = dmg_bonus + modifiers

                let table_format = "!power {{" +
                    " --name|" + name +
                    " --!Output|~C[TTB width='100%' bgcolor='White'][TRB]"

                dice.forEach((die, idx) => {
                    table_format += "[TDB]" + die + "~~~<small>Die " + (idx + 1) + "</small>[TDE]"
                })
                table_format += "[TRE]" +
                    "[TRB][TDB colspan='3']Modifiers: " + total_modifiers + "[TDE][TRE]"
                table_format += "[TRB][TDB colspan='3']Damage: " + (total + total_modifiers) + "[TDE][TRE]" +
                    "[TTE]~C"

                response = table_format
            }
            else if ((subtype === 'test' ||
                      subtype === 'initiative' ||
                      subtype === 'roll' ||
                      subtype === 'income') && args.length === 7) {
                let name = args.shift()
                let dice = args.shift()
                let attribute = args.shift()
                let attr_val = parseInt(eval(args.shift()))
                let focus_val = parseInt(eval(args.shift()))
                let modifiers = parseInt(eval(args.shift()))
                let tn = args.shift()

                let total = msg.inlinerolls[0].results.total
                let total_modifiers = attr_val + focus_val + modifiers
                let d = [
                    msg.inlinerolls[0].results.rolls[0].results[0].v,
                    msg.inlinerolls[0].results.rolls[0].results[1].v,
                    msg.inlinerolls[0].results.rolls[0].results[2].v
                ]
                if (subtype === 'test') {
                    response += expanseapi_card_hdr(name, 'Ability Test')
                    response += expanseapi_card_roll(attribute, total_modifiers, d,
                        total + total_modifiers, tn)
                } else if (subtype === 'initiative') {
                    response += expanseapi_card_hdr(name, 'Roll for Initiative')
                    response += expanseapi_card_roll(attribute, total_modifiers, d,
                        total + total_modifiers, 0, true)
                } else if (subtype === 'roll') {
                    response += expanseapi_card_hdr(name, 'Simple Roll')
                    response += expanseapi_card_roll(attribute, total_modifiers, d,
                        total + total_modifiers, 0, false, true)
                } else if (subtype === 'income') {
                    response += expanseapi_card_hdr(name, 'Income Roll')
                    response += expanseapi_card_roll(attribute, total_modifiers, d,
                    total + total_modifiers, tn, false, false, true)
                }
            }

        } catch (err) {
            final = "/desc TheExpanse: An error occurred: " + err.message
        } finally {
            final = "/desc <div style='font-style: normal;'>" + response + "</div>"
            setTimeout(() => {sendChat("", final)}, 250)
        }
    }
})

function expanseapi_resolve_roll( ) {

}

function expanseapi_card_hdr( char_name, card_type ) {
    let out = ''
    out += "<div style='clear: both; background-color: #054d69; border: 1px solid black; margin: 10px auto 0 -7px; border-radius: 5px 5px 0 0;'>";
        out += "<div style='width: 100%; color: #fff; font-weight: bold; padding: 5px 0; font-size: 1.4em; text-align: center;'>"
            out += char_name
        out += "</div>"
        out += "<div style='width: 100%; color: #dbeaee; font-style: italic; font-size: .8em; text-align: center;'>"
            out += card_type
        out += "</div>"
    out += "</div>"
    return out
}

function expanseapi_card_roll( ability, modifier, dice, result, test_num, initiative = false, simple = false, income = false ) {
    let out = ''
    out += "<div style='clear: both; background-color: #dbeaee; border: 1px solid black; text-align: center; border-top: none;  margin: 0 auto 0 -7px; padding-top: 10px; border-radius: 0 0 5px 5px;'>"

        if (!initiative) {
            out += "<div style='margin-bottom: 10px; font-size: 1.2em;'>" + ability + "</div>"
        }

        if ( modifier < 0 ) {
            out += "<div style='margin-bottom: 10px;'>Modifiers: <span style='color: #8b0000;'>" + modifier + "</span></div>"
        } else if ( modifier > 0 ) {
            out += "<div style='margin-bottom: 10px;'>Modifiers: <span style='color: black;'>" + modifier + "</span></div>"
        }
        out += "<table style='width: 90%; border-collapse: collapse; border-bottom: 1px solid black; margin: 0 auto 10px auto;'>"
            if (initiative || income || simple) {
                out += "<tr style='font-size: .8em; color: #707070;'><td style='width: 33.3%'>First Die</td><td style='width: 33.3%'>Second Die</td><td>Third Die</td></tr>"
            } else {
                out += "<tr style='font-size: .8em; color: #707070;'><td style='width: 33.3%'>First Die</td><td style='width: 33.3%'>Second Die</td><td style='background-color: #c7d5d9;'>Drama Die</td></tr>"
            }

            out += "<tr style='font-size: 1.4em;'>"
                for (i = 0; i < dice.length; i++ ) {
                    out += "<td"
                    if (i === 2 && !(initiative || simple || income) ) {
                        out += " style='padding-bottom: 5px; background-color: #c7d5d9'>"
                    } else {
                        out += " style='padding-bottom: 5px;'>"
                    }
                    out += dice[i]
                }
            out += "</tr>"
        out += "</table>"
        if (initiative) {
            out +="<div style='margin-bottom: 10px; font-size: 1.5em;'>"
            out += "Initiative: " + result
            out += "</div>"
        } else if (income) {
            out += "<div style='margin-bottom: 10px; font-size: 1.5em;'>"
            out += "Income: " + result + " vs. Cost: " + test_num
            out += "</div>"
            if (result < test_num) {
                /* Fail */
                out += "<div style='background-color: #8b0000; color: #fff; width: 70%; padding: 5px 0; margin: 0 auto 10px auto; font-size: 1.4em;'>We're fresh out.</div>"
            } else {
                /* Success */
                out += "<div style='background-color: #006400; color: #fff; width: 50%; padding: 5px 0; margin: 0 auto 10px auto; font-size: 1.4em;'>Ka-ching!</div>"
            }
        } else if (simple) {
            out +="<div style='margin-bottom: 10px; font-size: 1.5em;'>"
            out += "Result: " + result
            out += "</div>"
        } else {
            if (dice[0] === dice[1] || dice[0] === dice[2] || dice[1] === dice[2]) {
                out += "<div style='width: 90%; margin: 0 auto 10px auto; padding: 5px 0; font-size: 1.1em; background-color: #f5ac86;'>"
                out += "Stunt points: " + dice[2]
                out += "</div>"
            }
            out +="<div style='margin-bottom: 10px; font-size: 1.2em;'>"
            out += "Result: " + result + " vs. " + test_num
            out += "</div>"
            if ( result < test_num ) {
                /* Fail */
                out += "<div style='background-color: #8b0000; color: #fff; width: 50%; padding: 5px 0; margin: 0 auto 10px auto; font-size: 1.4em;'>Fail</div>"
            } else {
                /* Success */
                out += "<div style='background-color: #006400; color: #fff; width: 50%; padding: 5px 0; margin: 0 auto 10px auto; font-size: 1.4em;'>Success</div>"
            }
        }

    out += "</div>"
    return out
}
