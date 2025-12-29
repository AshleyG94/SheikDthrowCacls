import './charAttributes.js';
import './hitboxDB.js';
import './calculatormaths.js';

import characters from './charAttributes.js';
import { anumList, hitbox, chars } from './hitboxDB.js';
import { Hit } from './calculatormaths.js';

/*fair good, fair bad, uair good, uair bad
0 0 0 0 = Any DI
0 0 0 1 = Di for uair
0 0 1 0 = Not possible
0 0 1 1 = Dead to uair
0 1 0 0 = Di for fair
0 1 0 1 = True mixup
0 1 1 0 = Not possible
0 1 1 1 = Dead to uair Di For Fair
1 0 0 0 = Not possible
1 0 0 1 = Not possible
1 0 1 0 = Not possible
1 0 1 1 = Not possible
1 1 0 0 = Dead to fair
1 1 0 1 = Dead to fair Di for Uair
1 1 1 0 = Not possible
1 1 1 1 = Always dead*/



  

  export const MixupResult = Object.freeze({
    ANY_DI: 'any_di',
    DI_FOR_UAIR: 'di_for_uair',
    DEAD_TO_UAIR: 'dead_to_uair',
    DI_FOR_FAIR: 'di_for_fair',
    TRUE_MIXUP: 'true_mixup',
    DEAD_TO_UAIR_DI_FAIR: 'dead_to_uair_di_fair',
    DEAD_TO_FAIR: 'dead_to_fair',
    DEAD_TO_FAIR_DI_UAIR: 'dead_to_fair_di_uair',
    ALWAYS_DEAD: 'always_dead',
    NOT_POSSIBLE: 'not_possible',
  });

  export const MIXUP_COLOURS = {
    [MixupResult.ANY_DI]: "#A0A0A0",
    [MixupResult.DI_FOR_UAIR]: "#1E90FF",
    [MixupResult.NOT_POSSIBLE]: "#000000",
    [MixupResult.DEAD_TO_UAIR]: "#FF4500",
    [MixupResult.DI_FOR_FAIR]: "#32CD32",
    [MixupResult.TRUE_MIXUP]: "#FFD700",
    [MixupResult.DEAD_TO_UAIR_DI_FAIR]: "#FF69B4",
    [MixupResult.DEAD_TO_FAIR]: "#FF0000",
    [MixupResult.DEAD_TO_FAIR_DI_UAIR]: "#8B0000",
    [MixupResult.ALWAYS_DEAD]: "#4B0082",
  };

  const MIXUP_TABLE = {
    0b0000: MixupResult.ANY_DI,
    0b0001: MixupResult.DI_FOR_UAIR,
    0b0010: MixupResult.NOT_POSSIBLE,
    0b0011: MixupResult.DEAD_TO_UAIR,
  
    0b0100: MixupResult.DI_FOR_FAIR,
    0b0101: MixupResult.TRUE_MIXUP,
    0b0110: MixupResult.NOT_POSSIBLE,
    0b0111: MixupResult.DEAD_TO_UAIR_DI_FAIR,
  
    0b1000: MixupResult.NOT_POSSIBLE,
    0b1001: MixupResult.NOT_POSSIBLE,
    0b1010: MixupResult.NOT_POSSIBLE,
    0b1011: MixupResult.NOT_POSSIBLE,
  
    0b1100: MixupResult.DEAD_TO_FAIR,
    0b1101: MixupResult.DEAD_TO_FAIR_DI_UAIR,
    0b1110: MixupResult.NOT_POSSIBLE,
    0b1111: MixupResult.ALWAYS_DEAD,
  };

  function classifyMixup({
    fairGoodDI,
    fairBadDI,
    uairGoodDI,
    uairBadDI
  }) {
    const mask =
      (fairGoodDI << 3) |
      (fairBadDI  << 2) |
      (uairGoodDI << 1) |
      (uairBadDI);
  
    return MIXUP_TABLE[mask];
  }

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
    
    var isThrow = false;
    var grounded = false;
    var fadeIn = true;

    //where the dthrow hits from
    var hit_pos_x = foo.positions[foo.hitstun - 1][0];
    var hit_pos_y = foo.positions[foo.hitstun - 1][1];

    //Puffs velocity at end of hitstun
    var prevVelocityX = foo.positions[foo.hitstun - 1][2];
    var prevVelocityY = foo.positions[foo.hitstun - 1][3];

    //Set combo count 
    var combo = 1;
    var comboFrame = foo.hitstun - 1;

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
            
            return 1;
        }
    }
    return 0;
}

function get_array_for_percent(percent, stage_start, stage_end)
{
    let results = []
    let throw_tdi = [1.0,0];
    let fair_tdi = [-0.4125, 0.9125];
    let uair_tdi = [1.0, 0.0]

    for ( let i = 0; i < 101; i++ )
    {
        const starting_pos_x = stage_start[0] + (((stage_end[0] - stage_start[0])/100) * i)
        const starting_pos = [starting_pos_x, stage_start[1]];
        let fair = chars.Sh.fair.id0;
        let fair_good_di_end_position = get_ending_position('Puff', percent, starting_pos, throw_tdi, fair_tdi, fair);
        let fair_bad_di_end_position = get_ending_position('Puff', percent, starting_pos, throw_tdi, uair_tdi, fair);

        let bz = [188,246,-140,-246];
        let bzTop = bz[0];
        let bzRight = bz[1];
        let bzBottom = bz[2];
        let bzLeft = bz[3];
        let fair_good_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, fair_good_di_end_position, starting_pos_x);
        let fair_bad_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, fair_bad_di_end_position, starting_pos_x);

        let uair = chars.Sh.uair.clean.id0;
        let uair_good_di_end_position = get_ending_position('Puff', percent, starting_pos, throw_tdi, uair_tdi, uair);
        let uair_bad_di_end_position = get_ending_position('Puff', percent, starting_pos, throw_tdi, fair_tdi, uair);
        let uair_good_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, uair_good_di_end_position, starting_pos_x);
        let uair_bad_di_killed = hit_killed(bzTop, bzRight, bzBottom, bzLeft, uair_bad_di_end_position, starting_pos_x);

        results.push({
            starting_pos_x,
            result: classifyMixup({
              fairGoodDI: fair_good_di_killed,
              fairBadDI: fair_bad_di_killed,
              uairGoodDI: uair_good_di_killed,
              uairBadDI: uair_bad_di_killed
            })
          });
    }
    return results
}

export {
    get_array_for_percent,
  };
