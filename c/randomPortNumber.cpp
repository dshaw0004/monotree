#include <iostream>
#include <random>   // For random number generation
#include <limits>   // For numeric limits

int main() {
    try {
        // Create a random device and seed the generator
        std::random_device rd;  
        std::mt19937 gen(rd()); // Mersenne Twister engine

        // Define the range [min, max]
        int min = 1025, max = 10000;

        // Validate range
        if (min > max) {
            std::cerr << "Error: min cannot be greater than max.\n";
            return 1;
        }

        // Create a uniform distribution
        std::uniform_int_distribution<> dist(min, max);

        // Generate and print a random number
        int randomNumber = dist(gen);
        std::cout << "Random port number is " << randomNumber << "\n";

    } catch (const std::exception &e) {
        std::cerr << "Random generation failed: " << e.what() << "\n";
        return 1;
    }

    return 0;
}
