names = {
    'highlights': {
        'CircleDrawings': 'Morphing circles. Very cool',
        'Fireworks': 'Fireworks',
        'Phyllotaxis': 'Colourful flower patterns',
        'BarnsleyFern': 'Barnsley Fern',
        'FractalTrees': 'Trees that are generated in a fractal shape',
        'Toothpicks/v2': 'Hexagonal toothpicks',
        '4d': 'Rotating Tesseract 4d cube',
        'Roses': 'More polar coordinate roses',
        'Pendulum': 'Double pendulum simulation',
        'Sandpiles': 'Sand Piles simulation (similar to cellular automata)',

    },
    'visual': {
        'Animation': 'Simple animation',
        'Attractions': 'Attractor fields. Click to place more points',
        'BrownianSnowflake/v2': 'Creating a snowflake',
        'ChaosGame': 'Interesting shapes using randomness',
        'Elm/squares': 'Moving squares',
        'FlowFields': 'Animated Flow Fields',
        'KochSnowflake': 'Building the Koch snowflake. Click to see it change',
        'MultiplicationModN': 'Intricate pattern',
        'SinCos': 'Rotating lines',
        'Toothpicks/V1': 'Toothpick simulation',
        'Backgrounds/FirstTry': 'Funny screensaver consisting of bouncing circles',
    },
    'mathematical': {
        'ChaosEquations': 'Lorentz attractor',
        'Fourier/FourierSeriesV4': 'Smoothly Approximating other functions, with a cool circle graphic',
        'Graphing': 'Plot some functions',
        'HeatEquation': 'Simulating the 1D heat equation',
        'Mandlebrot': 'Mandlebrot and Julia sets',
        'MaurerRose': 'Maurer Rose',
        'Sierpinski': 'Sierpinski Triangle',
        'VectorFields': 'Vector Fields',
        'Voronoi': 'Weighted Voronoi segmentation'
    },
    'agents': {
        'FlockingSimulation': 'Flocking simulation based on boids',
        'GeneticAlgorithms': 'Using a genetic algorithm to make agents find a goal location.',
        'ShortestPath': 'Travelling Salesman Problem using genetic algorithms',
        'SmartRockets': 'More genetic algorithms',
        'SteeringBehaviours': 'Agent following the mouse'
    },
    'games': {
        'Balls': 'Select and shoot balls at each other',
        'Chess': "Silly chess game. Haven't implemented all the rules yet",
        'Flee': 'Simple avoidance game',
        'Platformer': 'Simple platformer game',
        'Raycasting': 'Raycasting First person movement (like DOOM)',
        'Reflections': 'Line of sight and reflection simulation',
        'Reflections2': 'Line of sight and first person reflections'
    },
    'silly / Uncompleted': {
        'CPPN': 'Playing around with colours using a compositional pattern '
        'producing network',
        'Ellipse': 'Silly',
        'Patterns': 'Triangle Picture',
        'Trippy': 'Fun pattern / screensaver',
        'DifferentialEquations': 'Vector Fields',
        'Fourier/FourierSeries': 'Drawing periodic functions',
        'Fourier/FourierSeriesV2': 'Approximating other functions',
        'Fourier/FourierSeriesV3': 'Approximating other functions, with a cool circle graphic',
    }
}
ans = ''
for cat, values in names.items():
    ans += f"## {cat.title()}\n"
    for key, value in values.items():
        ans += f'- {key}: [Demo](https://8onitsside.com/cc/{key}/), [Code](https://github.com/Michael-Beukman/creative-coding/tree/master/{key})\n    - {value}\n'

print(ans)
