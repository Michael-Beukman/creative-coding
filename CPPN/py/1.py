import numpy as np
import cv2
import matplotlib.pyplot as plt
from pyglet.gl import *
# print(gl.GLubyte)

def sigmoid(x):  
    return np.exp(-np.logaddexp(0, -x))


w1 = np.random.rand(400, 2) * 2 - 1
w2 = np.random.rand(20, 400) * 2 - 1
w3 = np.random.rand(3, 20) * 2 - 1
counter = 0
def get_image(write):
    global counter, w1, w2, w3
    counter += 1
    for ree in [w1, w2, w3]:
        ree += (np.random.rand(ree.shape[0], ree.shape[1])-0.5) / 50
    if counter % 1000 == 0:
        w1 = np.random.rand(400, 2) * 2 - 1
        w2 = np.random.rand(20, 400) * 2 - 1
        w3 = np.random.rand(3, 20) * 2 - 1
    def net(ins):
        hidden_1 = w1 @ ins
        # hidden_1 = np.tensordot(w1, ins, axes=[[0, 1], [0]])
        z = np.tanh(hidden_1)
        hidden_2 = w2 @ z
        # z_2 = (np.sin(hidden_2) + 1) / 2
        z_2 = np.tanh(hidden_2)
        hidden_3 = w3 @ z_2
        # return sigmoid(hidden_3)
        return (np.sin(hidden_3) + 1)/2
        return z_2

    size = (256)
    img = np.zeros((size, size, 3))
    index_im = np.zeros((2, size, size))
    for i in range(size):
        for j in range(size):
            # v = net(np.array([i, j]) / size)
            # v = np.array([0, 0, 0])
            index_im[:, i, j] = ([i, j])
            # print(v.shape)
            # print(v)
            # v *= 255
            # img[i, j, :] = np.round(v);
    # img = net(index_im)
    tmp = index_im.reshape(2, -1) / size
    vals = net(tmp)
    # print(vals.shape)
    # vals = vals.reshape
    # print(img.shape)
    # print(img)
    # to_write = vals.T.reshape(size, size, 3);
    vals = vals.reshape(3, size, size)
    to_write = np.moveaxis(vals, 0, -1)
    # print(vals.shape, to_write.shape)
    to_write = np.round(to_write * 255).astype(int);
    # print(to_write)

    # print(to_write.shape)
    # cv2.imwrite("ree.png", img)
    if write:
        cv2.imwrite("ree.png", to_write)
    return to_write

    pass
import pyglet


window = pyglet.window.Window()
# image = pyglet.resource.ArrayImage(img)

# pixels = img
# rawData = (GLubyte * len(pixels))(*pixels)
# imageData = pyglet.image.ImageData(3, 3, 'RGB', rawData)
# print(image)

@window.event
def on_draw():
    img = get_image(False)
    img = img.reshape(-1, 1).astype('uint8').flatten()
    # image = pyglet.resource.image('ree.png')
    rawData = (GLubyte * (img).size)(*img.astype('uint8'))
    image = pyglet.image.ImageData(256, 256, 'RGB', rawData)
    window.clear()
    image.blit(0, 0)

while True:
    pyglet.clock.tick()

    for window in pyglet.app.windows:
        window.switch_to()
        window.dispatch_events()
        window.dispatch_event('on_draw')
        window.flip()
    