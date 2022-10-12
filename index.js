const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

async function main() {

  let hero, villain;
  
  const hero_settings = await prisma.settings.create({
    data: {
      name: "hero_settings",
      params: {
        min_health: 70,
        max_health: 100,
        min_strength: 70,
        max_strength: 80,
        min_defence: 45,
        max_defence: 55,
        min_speed: 40,
        max_speed: 50,
        min_luck: 10,
        max_luck: 30
      }
    }
  })

  const villain_settings = await prisma.settings.create({
    data: {
      name: "villain_settings",
      params: {
        min_health: 60,
        max_health: 90,
        min_strength: 60,
        max_strength: 90,
        min_defence: 40,
        max_defence: 60,
        min_speed: 40,
        max_speed: 60,
        min_luck: 25,
        max_luck: 40
      }
    }
  })
  
  let http = require('http');
  http.createServer(async (req, res) => {
    
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    if(req.url === '/init') {
      hero = await prisma.character.create({
        data: {
          is_hero: true,
          health: random(hero_settings.params.min_health, hero_settings.params.max_health),
          strength: random(hero_settings.params.min_strength, hero_settings.params.max_strength),
          speed: random(hero_settings.params.min_speed, hero_settings.params.max_speed),
          defence: random(hero_settings.params.min_defence, hero_settings.params.max_defence),
          luck: random(hero_settings.params.min_luck, hero_settings.params.max_luck),
        }
      })
    
      villain = await prisma.character.create({
        data: {
          health: random(villain_settings.params.min_health, villain_settings.params.max_health),
          strength: random(villain_settings.params.min_strength, villain_settings.params.max_strength),
          speed: random(villain_settings.params.min_speed, villain_settings.params.max_speed),
          defence: random(villain_settings.params.min_defence, villain_settings.params.max_defence),
          luck: random(villain_settings.params.min_luck, villain_settings.params.max_luck),
        }
      })
      res.end();
    }

    if(req.url === '/hero') {
      res.write(JSON.stringify(hero))
      res.end();
    }

    if(req.url === '/villain') {
      res.write(JSON.stringify(villain))
      res.end();
    }

  }).listen(3000, () => console.log('server start on port 3000'));

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })