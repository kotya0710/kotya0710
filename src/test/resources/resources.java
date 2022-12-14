class resources_test {
    public static void main(String []args)
    {
        System.out.println("Resourses tested OK!");
        java.io.File file = new java.io.File("./resourses-test");
        try(FileOutputStream fos = new FileOutputStream(file);
                BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            byte[] bytes = data.getBytes();
            bos.write(bytes);
            bos.close();
            fos.close();
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
    }
}