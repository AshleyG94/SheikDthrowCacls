require('./charAttributes.js');
require('./hitboxDB.js');
require('./calculatormaths.js')
const characters = require('./charAttributes');
const { anumList, hitbox, chars } = require('./hitboxDB.js');
const { Hit } = require('./calculatormaths');
const fs = require('fs');

function get_ending_position(enemy, starting_percent, start_pos, throw_tdi, hit_tdi, hit_hitbox)
{  
    var dthrow = chars.Sh.dthrow.id0;
    var crouch = false
    var reverse = false;
    var charge_interrupt = false;
    var sdiX = 0.0;
    var sdiY = 0.0;
    var zdiX = 0.0;
    var zdiY = 0.0;
    var adiX = 0.0;
    var adiY = 0.0;
    var fadeIn = false;
    var doubleJump = false;
    var meteorCancel = false;
    var vcancel = false;
    var metal = false;
    var ice = false;
    var icg = false;
    var combo = 0;
    var comboFrame = 0;
    var yoshiDJArmor = false;
    var isThrow = true;
    var throwChar = "Sh";
    var throwType = "d";
    var grounded = true;
    var prevVelocityX = 0.0;
    var prevVelocityY = 0.0;
   
    var foo = new Hit( starting_percent, dthrow, enemy, 'NTSC', start_pos[0], start_pos[1], crouch, reverse, charge_interrupt, throw_tdi[0], throw_tdi[1], fadeIn, doubleJump, sdiX, sdiY, zdiX, zdiY, adiX, adiY, meteorCancel, vcancel, grounded, metal, ice, icg, isThrow, throwChar, throwType, combo, comboFrame, yoshiDJArmor, prevVelocityX, prevVelocityY );

    //The fair is hitting now, isThrow is now false, update some variables due to the first hit, and deal with the update to percent
    
    isThrow = false;
    grounded = false;
    fadeIn = true;

    //where the dthrow hits from
    hit_pos_x = foo.positions[foo.hitstun - 1][0];
    hit_pos_y = foo.positions[foo.hitstun - 1][1];

    //Puffs velocity at end of hitstun
    prevVelocityX = foo.positions[foo.hitstun - 1][2];
    prevVelocityY = foo.positions[foo.hitstun - 1][3];

    //Set combo count 
    combo = 1;
    comboFrame = foo.hitstun - 1;

    //Add percent from dthrow - note not what is listed in sheik dthrow id0 damage
    let second_percent = starting_percent + 8;
    let fair_hit = new Hit(second_percent, hit_hitbox, enemy, 'NTSC', hit_pos_x, hit_pos_y,  crouch, reverse, charge_interrupt, hit_tdi[0], hit_tdi[1], fadeIn, doubleJump, sdiX, sdiY, zdiX, zdiY, adiX, adiY, meteorCancel, vcancel, grounded, metal, ice, icg, isThrow, throwChar, throwType, combo, comboFrame, yoshiDJArmor, prevVelocityX, prevVelocityY );

    //var fair_hit = new Hit(percent )
    //console.log(fair_hit.hitstun);
    //console.log(fair_hit.positions[fair_hit.hitstun]);
    return fair_hit.positions;

}

function hit_killed(bzTop, bzRight, bzBottom, bzLeft, end_position, start_position){

    for ( let i = 0; i < end_position.length - 1; i++)
    {
        let x = end_position[i][0];
        let y = end_position[i][1];
        
        if (x >= bzRight || x <= bzLeft || y <= bzBottom || (y >= bzTop && end_position[i][3] >= 2.4))
        {
            if ( start_position > 33 && start_position < 35 )
            {
                console.log(x);
                console.log(y);
                console.log(i);
                console.log(bzRight);
            }
            return 1;
        }
    }
    return 0;
}
   


for (let i = 0; i < 20; i++ )
{
    const starting_percent = 70 + i*2;
    let throw_tdi = [1.0,0];
    let throw_tdi_in = [-0.6875, 0.7250];
    let fair_tdi = [-0.4125, 0.9125];
    let uair_tdi = [1.0, 0.0]
    let output_data = [['StartPos','fgdi', 'fbdi', 'ugdi','ubdi']];
    for ( let i = 0; i < 101; i++ )
    {
        const starting_pos_x = -85.56570 + (85.56570 * 2)*0.01*i;
        const starting_pos = [starting_pos_x, 0.0];
        let fair = chars.Sh.fair.id0;
        let fair_good_di_end_position = get_ending_position('Puff', starting_percent, starting_pos, throw_tdi, fair_tdi, fair);
        let fair_bad_di_end_position = get_ending_position('Puff', starting_percent, starting_pos, throw_tdi, uair_tdi, fair);

        let bz = [188,246,-140,-246];
        let bzTop = bz[0];
        let bzRight = bz[1];
        let bzBottom = bz[2];
        let bzLeft = bz[3];
        let fair_good_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, fair_good_di_end_position, starting_pos_x);
        let fair_bad_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, fair_bad_di_end_position, starting_pos_x);

        let uair = chars.Sh.uair.clean.id0;
        let uair_good_di_end_position = get_ending_position('Puff', starting_percent, starting_pos, throw_tdi, uair_tdi, uair);
        let uair_bad_di_end_position = get_ending_position('Puff', starting_percent, starting_pos, throw_tdi, fair_tdi, uair);
        let uair_good_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, uair_good_di_end_position, starting_pos_x);
        let uair_bad_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, uair_bad_di_end_position, starting_pos_x);
    

        output_data.push([starting_pos_x, fair_good_di_killed, fair_bad_di_killed, uair_good_di_killed, uair_bad_di_killed]);
    }
    const csv_output = output_data.map(row => row.join(',')).join('\n');
    let string = 'FD' + starting_percent + '.csv';
    fs.writeFileSync(string, csv_output, 'utf8');
}