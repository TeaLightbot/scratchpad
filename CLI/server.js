var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('TWR (t), SI (s) or DV (d)? ');
rl.prompt();
var current = { si: 0 };

var addTwr = function(g, m, f){
    rl.question('Force: ', (answer) => {
        f += parseInt(answer);
        rl.question('Mass: ', (answer) => {
            m += parseInt(answer);
            var ratio = f/(m*g);
            console.log(ratio);
            console.log(ratio > 1 ? 'You\'re going to space!' : 'MOAR BOOSTERS!');
            rl.question('Add (a) or quit (q): ', (answer) => {
                if (answer == 'q'){
                    rl.prompt();
                } else {
                    addTwr(g, m, f);
                }
            });
        });    
    });
}

var twr = function(){
    var g = 0;
    var m = 0;
    var f = 0;
    rl.question('Gravity: ', (answer) => {
        g = answer;
        addTwr(g, m, f);
    });
};

var addSi = function(f, i, t){
    rl.question('Force: ', (force) => {
        f += parseInt(force)
        rl.question('Impulse: ', (impulse) => {
            i += parseInt(force)/parseInt(impulse);
            console.log(++t + ' engines added.')
            rl.question('Add (a) or quit (q): ', (answer) => {
                if (answer == 'q'){
                    current.si = f/i;
                    console.log(current.si);
                    rl.prompt();
                } else {
                    addSi(f, i, t, current);
                }
            });
        });    
    });
};

var si = function(){
    var f = 0;
    var i = 0;
    var t = 0;
    addSi(f, i, t);
};

var calcDv = function(s){
    rl.question('Starting mass: ', (ms) => {
        rl.question('End mass: ', (me) => {
            rl.question('Gravity: ', (g) => {
               console.log(Math.log(ms / me) * s * g);
               rl.prompt(); 
            });
        });
    });
};

var dv = function(){
    rl.question('Use current si? ', (answer) => {
        if (answer == 'y'){
            calcDv(current.si);
        } else {
            rl.question('Si: ', (answer) => {
                calcDv(parseInt(answer));
            });
        }
    });
};

rl.on('line', (line) => {
  console.log('\u001B[2J\u001B[0;0f');
  switch(line.trim()) {
    case 't':
        twr();
        break;
    case 's':
        si();
        break;
    case 'd':
        dv();
        break;
    default:
        console.log('Not recognised');
        break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});