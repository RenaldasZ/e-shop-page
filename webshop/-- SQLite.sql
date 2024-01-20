-- SQLite
-- Inserting data for Boards
INSERT INTO api_product (id, name, description, price, pictureUrl, brand, type, quantityInStock, productSize)
VALUES
(1, 'Angular Speedster Board 2000', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 20000, '/image1.png', 'Angular', 'Boards', 100, 'xs'),
(2, 'Green Angular Board 3000', 'Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.', 15000, '/image2.png', 'Angular', 'Boards', 100, 'sm'),
(3, 'Core Board Speed Rush 3', 'Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.', 18000, '/image3.png', 'NetCore', 'Boards', 100, 'md'),
(4, 'Net Core Super Board', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.', 30000, '/image1.png', 'NetCore', 'Boards', 100, 'xl'),
(5, 'React Board Super Whizzy Fast', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 25000, '/image2.png', 'React', 'Boards', 100, 'xl'),
(6, 'Typescript Entry Board', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 12000, '/image3.png', 'TypeScript', 'Boards', 100, 'md'),
(17, 'Angular Purple Boots', 'Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.', 15000, '/image2.png', 'Angular', 'Boots', 100, 'sm'),
(18, 'Angular Blue Boots', 'Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.', 18000, '/image3.png', 'Angular', 'Boots', 100, 'md');

-- Inserting data for Hats
INSERT INTO api_product (id, name, description, price, pictureUrl, brand, type, quantityInStock, productSize)
VALUES
(7, 'Core Blue Hat', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 1000, '/image1.png', 'NetCore', 'Hats', 100, 'sm'),
(8, 'Green React Woolen Hat', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 8000, '/image2.png', 'React', 'Hats', 100, 'sx'),
(9, 'Purple React Woolen Hat', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 1500, '/image3.png', 'React', 'Hats', 100, 'sx');

-- Inserting data for Gloves
INSERT INTO api_product (id, name, description, price, pictureUrl, brand, type, quantityInStock, productSize)
VALUES
(10, 'Blue Code Gloves', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 1800, '/image1.png', 'VS Code', 'Gloves', 100, 'sm'),
(11, 'Green Code Gloves', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 1500, '/image2.png', 'VS Code', 'Gloves', 100, 'md'),
(12, 'Purple React Gloves', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 1600, '/image3.png', 'React', 'Gloves', 100, 'xl'),
(13, 'Green React Gloves', 'Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 1400, '/image1.png', 'React', 'Gloves', 100, 'sm');

-- Inserting data for Boots
INSERT INTO api_product (id, name, description, price, pictureUrl, brand, type, quantityInStock, productSize)
VALUES
(14, 'Redis Red Boots', 'Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.', 25000, '/image2.png', 'Redis', 'Boots', 100, 'md'),
(15, 'Core Red Boots', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.', 18999, '/image3.png', 'NetCore', 'Boots', 100, 'xl'),
(16, 'Core Purple Boots', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.', 19999, '/image1.png', 'NetCore', 'Boots', 100, 'sm');
