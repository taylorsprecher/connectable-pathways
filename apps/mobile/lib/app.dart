import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'controllers/pathway_controller.dart';
import 'screens/pathway_editor_screen.dart';

class ConnectablePathwaysApp extends StatelessWidget {
  const ConnectablePathwaysApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => PathwayController(),
      child: MaterialApp(
        title: 'Connectable Pathways',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const PathwayEditorScreen(),
      ),
    );
  }
}
