names = {
    'mathematical': {
        '4d': 'Rotating Tesseract 4d cube',
        'ChaosEquations': 'Lorentz attractor',
        'DifferentialEquations': 'Vector Fields',
        'Fourier/FourierSeries': 'Drawing periodic functions',
        'Fourier/FourierSeriesV2': 'Approximating other functions',
        'Fourier/FourierSeriesV3': 'Approximating other functions, with a cool circle graphic',
        'Fourier/FourierSeriesV4': 'Smoother version of the above',
        'Graphing': 'Plot some functions',
        'HeatEquation': 'Simulating the 1D heat equation',
        'Mandlebrot': 'Mandlebrot and Julia sets',
        'MaurerRose': 'Maurer Rose',
        'Pendulum': 'Double pendulum simulation',
        'Roses': 'More polar coordinate roses',
        'Sierpinski': 'Sierpinski Triangle',
        'VectorFields': 'Vector Fields',
        'Voronoi': 'Weighted Voronoi segmentation'
    },
    'visual': {
        'Animation': 'Simple animation',
        'Attractions': 'Attractor fields. Click to place more points',
        'Backgrounds/FirstTry': 'Funny screensaver consisting of bouncing circles',
        'BarnsleyFern': 'Barnsley Fern',
        'BrownianSnowflake/v2': 'Creating a snowflake',
        'ChaosGame': 'Interesting shapes using randomness',
        'CircleDrawings': 'Morphing circles. Very cool',
        'Elm/squares': 'Moving squares',
        'Fireworks': 'Fireworks',
        'FlowFields': 'Animated Flow Fields',
        'FractalTrees': 'Trees that are generated in a fractal shape',
        'Koch-Snowflake': 'Building the Koch snowflake. Click to see it change',
        'MultiplicationModN': 'Intricate pattern',
        'Phyllotaxis': 'Colourful flower patterns',
        'SinCos': 'Rotating lines',
        'Toothpicks/V1': 'Toothpick simulation',
        'Toothpicks/v2': 'Hexagonal toothpicks'
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
    'silly': {
        'CPPN': 'Playing around with colours using a compositional pattern '
        'producing network',
        'Ellipse': 'Silly',
        'Patterns': 'Triangle Picture',
        'Sandpiles': 'Sand Piles simulation (similar to cellular automata)',
        'Trippy': 'Fun pattern / screensaver'
    }
}
ans = ''
for cat, values in names.items():
    ans += f"## {cat.title()}\n"
    for key, value in values.items():
        ans += f'- {key}: [Demo](https://8onitsside.com/cc/{key}/), [Code](https://github.com/Michael-Beukman/creative-coding/{key})\n    - {value}\n'

print(ans)
