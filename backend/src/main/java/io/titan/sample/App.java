package io.titan.sample;

/** Entry point of the Titan e2e sample backend — prints a greeting. */
public final class App {

    private App() {
    }

    public static void main(String[] args) {
        String name = args.length > 0 ? args[0] : null;
        System.out.println(Greeter.greet(name));
    }
}
