//! Création d'une instance Vue c'est notre application
Vue.createApp({
    //! Dans une fonction data on va retourner un objet qui contiendra les variables de l'application
    //! Toutes les data seront contenues dans this
    data() {
        return {
        player: {
            name : "Theo",
            vie : 100,
            att : 10,
            spe : 20
        },
        enemy: {
            name : "Romaric",
            vie : 50,
            att : 15,
        },
        count: 0,
        gameover: false,
        winner: '',
        triche_pal: 100,
        triche: 100,
        toggle: ''
    };
    },
    
    methods: {
        attackPlayer(){
            this.enemy.vie -= this.player.att;
            this.attackEnemy();
            if(this.enemy.vie <= 0 ){
                this.enemy.vie = 0;
            }
            if(this.player.vie <= 0){
                this.player.vie = 0;
            }
            this.count++;
        },
        healPlayer(){
            this.player.vie += 7;
            if(this.player.vie >= 100){
                this.player.vie = 100;
            }
            this.attackEnemy();
            this.count++;
        },
        speAttackPlayer(){
            this.enemy.vie -= this.player.spe;
            this.attackEnemy();
            this.count++;
        },
        attackEnemy(){
            let result = Math.floor((Math.random() * 100));
            switch (true) {
                case result == 0:
                    this.enemy.vie -= this.enemy.att;
                    console.log("échec critique");
                    break;
                case result <= 10 && result > 0:
                    console.log("échec attaque");
                    break;
                case result >= 90:
                    this.player.vie -= (this.enemy.att *3);
                    console.log("coup critique");
                    break;
                default:
                    this.player.vie -= this.enemy.att;
                    console.log("attaque");
                    break;
            }
        },
        giveUp(){
            this.player.vie = 0;
        },
        vieEnemyDown(){
            this.enemy.vie = 0;

            this.giveUp();
        },
        viePlayerDown(){
            this.player.vie = 0;
            
        },
        restart(){
            this.enemy.vie = 100;
            this.toggle =  '';
            this.player.vie = 100;
            this.gameover = false;
            this.triche = 100;
            this.triche_pal = 100;
            this.count = 0;
            this.winner = '';
            console.log('restart');
        },
        //Gère les tours
        tour(){
            if(this.count % 3 == 0){
                return false
            }else{
                return true
            }
        }
        
    },
    computed:{
        
        
    },
    watch:{
        'enemy.vie'(hp){
            if(hp <= 0){
                this.enemy.vie = 0;
                setTimeout(() => {
                    this.gameover = true;
                  }, 5000);
                this.winner = 'Player';
                console.log(hp+"C'est la vie de l'adversaire.");
                setTimeout(() => {
                    this.triche_pal = 0 ;
                  }, 5000);
                setTimeout(() => {
                    this.toggle = 'none';
                  }, 5000);
            }
            
        },
        'player.vie'(newValue){
            if(newValue <= 0){
                this.player.vie = 0;
                setTimeout(() => {
                    this.gameover = true;
                  }, 5000);
                this.winner = 'Enemy';
                setTimeout(() => {
                    this.triche = 0 ;
                  }, 5000);
                setTimeout(() => {
                    this.toggle = 'none';
                  }, 5000);
            }
        }
    }
    }).mount('#app');