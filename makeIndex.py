names = {
    'mathematical': {
        'ChaosEquations': 'Lorentz attractor',
        'DifferentialEquations': 'Vector Fields',
        'Fourier/FourierSeries': 'Drawing periodic functions',
        'Fourier/FourierSeriesV2': 'Approximating other functions',
        'Fourier/FourierSeriesV3': 'Approximating other functions, with a cool circle graphic',
        'Fourier/FourierSeriesV4': 'Smoother version of the above',
        'Voronoi': 'Weighted Voronoi segmentation',
        '4d': 'Rotating Tesseract 4d cube',
        'heatEquation': 'Simulating the 1D heat equation',
        'mandlebrot': 'Mandlebrot and Julia sets',
        'maurerRose': 'Maurer Rose',
        'pendulum': "Double pendulum simulation",
        'roses': 'More polar coordinate roses',
        'vectorFields': 'Vector Fields',
        'Graphing': "Plot some functions",
        'Sierpinski': "Sierpinski Triangle",

    },
    'visual': {
        'Backgrounds/FirstTry': 'Funny screensaver consisting of bouncing circles',
        'BrownianSnowflake/v2': 'Creating a snowflake',
        'BarnsleyFern': 'Barnsley Fern',
        'ChaosGame': 'Interesting shapes using randomness',
        'CircleDrawings': 'Morphing circles. Very cool',
        'Elm/squares': 'Moving squares',
        'Koch-Snowflake': 'Building the Koch snowflake. Click to see it change',
        'MultiplicationModN': 'Intricate pattern',
        'SinCos': 'Rotating lines',
        'Toothpicks/V1': 'Toothpick simulation',
        'Toothpicks/v2': 'Hexagonal toothpicks',
        'attractions': 'Attractor fields. Click to place more points',
        'flowFields': 'Animated Flow Fields',
        'fireworks': "Fireworks",
        'FractalTrees': "Trees that are generated in a fractal shape",
        'Phyllotaxis': "Colourful flower patterns",
        'animation': "Simple animation",


    },
    'agents': {
        'FlockingSimulation': 'Flocking simulation based on boids',
        'GeneticAlgorithms': 'Using a genetic algorithm to make agents find a goal location.',
        'steeringBehaviours': 'Agent following the mouse',
        'SmartRockets': 'More genetic algorithms',
        "shortestPath": "Travelling Salesman Problem using genetic algorithms"

    },
    'games': {
        'balls': 'Select and shoot balls at each other',
        'chess': "Silly chess game. Haven't implemented all the rules yet",
        "platformer": "Simple platformer game",
        'raycasting': 'Raycasting First person movement (like DOOM)',
        'reflections': 'Line of sight and reflection simulation',
        'reflections2': 'Line of sight and first person reflections',
        'Flee': "Simple avoidance game",
    },
    "silly": {
        'CPPN': 'Playing around with colours using a compositional pattern producing network',
        'Trippy': 'Fun pattern / screensaver',
        'ellipse': 'Silly',
        'patterns': 'Triangle Picture',
        'sandpiles': "Sand Piles simulation (similar to cellular automata)",
    },
}
ans = ''
for cat, values in names.items():
    ans += f"## {cat.title()}\n"
    for key, value in values.items():
        ans += f'- {key}: [Demo](https://8onitsside.com/cc/{key}/), [Code](https://github.com/Michael-Beukman/creative-coding/{key})\n    - {value}\n'

print(ans)
