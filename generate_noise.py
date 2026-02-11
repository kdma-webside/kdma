from PIL import Image
import numpy as np

# Create a 200x200 noise texture
width, height = 200, 200
noise = np.random.randint(0, 256, (height, width), dtype=np.uint8)

# Create an image from the noise array
img = Image.fromarray(noise, mode='L')

# Save the image
img.save('public/images/noise.png')
print('Noise texture created successfully!')
